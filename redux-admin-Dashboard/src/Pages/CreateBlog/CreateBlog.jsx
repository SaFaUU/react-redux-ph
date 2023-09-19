import { useRef, useState } from "react";

const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: '',
    });

    const titleInputRef = useRef(null);
    const contentInputRef = useRef(null);
    const imageInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const genres = Array.from(checkboxes).map((checkbox) => checkbox.value);

        console.log(genres);
        // Validate form data here if needed
        // const { title, content, image } = formData;

        // // You can now submit the data or perform other actions as needed
        // console.log('Submitted Data:', { title, content, image });

        // fetch("http://localhost:5000/create-post", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         title,
        //         content,
        //         image,
        //         time: new Date()

        //     }),
        // })
        //     .then(res => res.json())
        //     .then(data => console.log(data))

        // // Clear form inputs

        // setFormData({
        //     title: '',
        //     content: '',
        //     image: '',
        // });

        // // Focus on the first input (title) after submission
        // titleInputRef.current.focus();

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="bg-white p-8 rounded-lg shadow-md w-4/6">
                <h1 className="text-2xl font-semibold mb-4">Create a New Blog Article</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-600">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter the title"
                            required
                            ref={titleInputRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-600">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            rows="6"
                            placeholder="Write your article content here"
                            required
                            ref={contentInputRef}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="image" className="block text-gray-600">
                            Image Link
                        </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter the image link"
                            ref={imageInputRef}
                        />
                    </div>
                    <div className="flex space-x-5 justify-between">
                        <label className="label cursor-pointer space-x-3">
                            <span className="label-text">Thriller</span>
                            <input type="checkbox" className="checkbox" value={"Thriller"} />
                        </label>
                        <label className="label cursor-pointer space-x-3">
                            <span className="label-text">Psychology</span>
                            <input type="checkbox" className="checkbox" value={"Psychology"} />
                        </label>
                        <label className="label cursor-pointer space-x-3">
                            <span className="label-text">Science Fiction</span>
                            <input type="checkbox" className="checkbox" value={"Science Fiction"} />
                        </label>
                        <label className="label cursor-pointer space-x-3">
                            <span className="label-text">Slice of Life</span>
                            <input type="checkbox" className="checkbox" value={"Slice of Life"} />
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center mt-10">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBlog;