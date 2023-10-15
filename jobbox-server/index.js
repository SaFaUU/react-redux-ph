require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1cmhy5v.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("jobbox");
    const userCollection = db.collection("user");
    const jobCollection = db.collection("job");

    app.post("/user", async (req, res) => {
      const user = req.body;

      const result = await userCollection.insertOne(user);

      res.send(result);
    });

    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;

      const result = await userCollection.findOne({ email });

      if (result?.email) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });
    });

    app.patch("/apply", async (req, res) => {
      const userId = req.body.userId;
      const jobId = req.body.jobId;
      const email = req.body.email;

      const filter = { _id: ObjectId(jobId) };
      const updateDoc = {
        $push: {
          applicants: {
            id: ObjectId(userId),
            email,
            approvalStatus: "pending",
          }
        }, // pending, accepted, rejected
      };

      const result = await jobCollection.updateOne(filter, updateDoc);

      if (result.acknowledged) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });
    });

    app.patch("/query", async (req, res) => {
      const userId = req.body.userId;
      const jobId = req.body.jobId;
      const email = req.body.email;
      const question = req.body.question;

      const filter = { _id: ObjectId(jobId) };
      const updateDoc = {
        $push: {
          queries: {
            id: ObjectId(userId),
            email,
            question: question,
            reply: [],
          },
        },
      };

      const result = await jobCollection.updateOne(filter, updateDoc);

      if (result?.acknowledged) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });
    });

    app.patch("/reply", async (req, res) => {
      const userId = req.body.userId;
      const reply = req.body.reply;


      const filter = { "queries.id": ObjectId(userId) };

      const updateDoc = {
        $push: {
          "queries.$[user].reply": reply,
        },
      };
      const arrayFilter = {
        arrayFilters: [{ "user.id": ObjectId(userId) }],
      };

      const result = await jobCollection.updateOne(
        filter,
        updateDoc,
        arrayFilter
      );
      if (result.acknowledged) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });
    });

    app.get("/applied-jobs/:email", async (req, res) => {
      const email = req.params.email;
      const query = { applicants: { $elemMatch: { email: email } } };
      const cursor = jobCollection.aggregate([
        {
          $match: query,
        },
        {
          $unwind: "$applicants",
        },
        {
          $match: {
            "applicants.email": email,
          },
        },
        {
          $project: {
            _id: 1,
            companyName: 1,
            position: 1,
            location: 1,
            employmentType: 1,
            approvalStatus: "$applicants.approvalStatus",
          },
        },
      ]);
      const result = await cursor.toArray();

      res.send({ status: true, data: result });
    });

    app.get("/posted-jobs/:email", async (req, res) => {
      const email = req.params.email;
      const query = { postedBy: email };
      const cursor = jobCollection.find(query);
      const result = await cursor.toArray();
      res.send({ status: true, data: result });
    });

    app.get("/jobs", async (req, res) => {
      const cursor = jobCollection.find({
        jobOpen: true,
      });
      const result = await cursor.toArray();
      res.send({ status: true, data: result });
    });
    app.get("/applicants/:id", async (req, res) => {
      const id = req.params.id;
      const jobId = ObjectId(id);

      const applicants = await jobCollection.aggregate([
        { $match: { _id: jobId } },
        { $unwind: "$applicants" },
        {
          $lookup: {
            from: "user",
            localField: "applicants.email",
            foreignField: "email",
            as: "applicants"
          }
        },
        { $unwind: "$applicants" },
        { $replaceRoot: { newRoot: "$applicants" } },
      ]).toArray();


      console.log(applicants);


      res.send({ status: true, data: applicants });

    });


    app.get("/job/:id", async (req, res) => {
      const id = req.params.id;

      const result = await jobCollection.findOne({ _id: ObjectId(id) });
      res.send({ status: true, data: result });
    });

    app.patch("/toggle-job-status", async (req, res) => {
      const id = req.body._id;
      const jobOpen = req.body.jobOpen;

      const filter = { _id: ObjectId(id) };

      const updateDoc = {
        $set: {
          jobOpen: jobOpen,
        }
      };

      const result = await jobCollection.updateOne(
        filter,
        updateDoc,
      );
      if (result.acknowledged) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });


    })

    app.post("/job", async (req, res) => {
      const job = req.body;

      const result = await jobCollection.insertOne(job);

      res.send({ status: true, data: result });
    });

    app.get("/get-messages", async (req, res) => {
      const jobId = req.query.jobId;
      const employerId = req.query.employerId;
      const candidateId = req.query.candidateId;
      console.log(jobId, employerId, candidateId);

      const result = await jobCollection.aggregate([
        {
          $match: {
            _id: ObjectId(jobId),
            'applicants.id': ObjectId(candidateId),
          },
        },
        {
          $unwind: '$applicants', // Unwind the array
        },
        {
          $match: {
            'applicants.id': ObjectId(candidateId),
          },
        },
        {
          $unwind: '$applicants.messages',
        },
        {
          $project: {
            _id: 0,
            text: '$applicants.messages.text',
            sender: '$applicants.messages.sender',
          },
        },
      ]).toArray()
      res.send({ status: true, data: result });
    })

    app.patch("/message", async (req, res) => {
      const jobId = req.body.jobID;
      const employerId = req.body.employerID;
      const candidateId = req.body.candidateID;
      const messages = req.body.messages;

      const query = {
        '_id': ObjectId(jobId),
        'applicants.id': ObjectId(candidateId)
      };

      const update = {
        $set: {
          'applicants.$.messages': messages,
          'applicants.$.employerId': employerId,
        }
      };

      const result = await jobCollection.updateOne(query, update);

      if (result.acknowledged) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });
    });
  }
  finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
