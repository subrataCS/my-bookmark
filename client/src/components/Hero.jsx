import React, { useEffect, useState } from "react";
import "../CSS/Hero.css";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

export const Hero = () => {
  const [input, setInput] = useState("");
  const [urlname, setUrlname] = useState(""); 
  const [bookmarks, setBookmarks] = useState([]); 
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [editName, setEditName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // post the data to the backend and save it to mongodb
const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate that both fields are filled
  if (!input || !urlname) {
    toast.error("Both URL and Bookmark Name are required!");
    return; // Exit the function early
  }

  // Prepend "http://" if the input URL doesn't start with "http://" or "https://"
  const fullUrl =
    input.startsWith("http://") || input.startsWith("https://")
      ? input
      : `http://${input}`;

  try {
    const response = await axios.post("http://localhost:7000/api/input", {
      inputValue: fullUrl, // Use the validated full URL
      name: urlname, // Use the name
    });
    toast.success("Bookmark added successfully!");
    setBookmarks((prevBookmarks) => [...prevBookmarks, response.data.data]);
    setInput("");
    setUrlname("");
  } catch (err) {
    toast.error("Error adding bookmark: " + err.message);
    console.error("Error:", err);
  }
};

  // ****************************************************
  // fetch all data from the database
  const fetchAlldata = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/inputs");
      const data = response.data.data;
      console.log(data)
      setBookmarks(data); 
    } catch (err) {
      toast.error("Error fetching bookmarks: " + err.message);
      console.error(err);
    }
  };

  // calling the function when the page loads
  useEffect(() => {
    fetchAlldata();
  }, []);

  //  ***********************************************************
  // Creating Edit option
  const handleEditClick = (bookmark) => {
    setEditingId(bookmark._id);
    setEditInput(bookmark.inputValue);
    setEditName(bookmark.name);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:7000/api/inputs/${editingId}`,
        {
          inputValue: editInput,
          name: editName,
        }
      );
      toast.success("Bookmark edited successfully!");

      setBookmarks((prevBookmarks) =>
        prevBookmarks.map((bookmark) =>
          bookmark._id === editingId ? response.data.data : bookmark
        )
      );
      setEditingId(null);
      setEditInput("");
      setEditName("");
    } catch (err) {
      toast.error("Error editing bookmark: " + err.message);
      console.error(err);
    }
  };
  // ************************************************************
  // delete option
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/inputs/${id}`);
      setBookmarks((prevBookmarks) =>
        prevBookmarks.filter((bookmark) => bookmark._id !== id)
      );
      toast.success("Bookmark deleted successfully!");
    } catch (err) {
      toast.error("Error deleting bookmark: " + err.message);
      console.error("Error deleting bookmark:", err);
    }
  };

  const confirmDelete = (id) => {
    const userConfirmed = window.confirm(
      "Do you want to delete this bookmark?"
    );
    if (userConfirmed) {
      handleDelete(id);
    }
  };

  // search feature
  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

// open the url setup 

  const openUrl = (url) => {
    window.open(url, "_blank"); 
    console.log(url)
  };





  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="hero">
        <h1>Save Your BookMarks</h1>

        <form action="" className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter the URL "
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter the BookMark Name"
            className="name"
            value={urlname} // Fixed state naming convention
            onChange={(e) => setUrlname(e.target.value)} // Fixed state naming convention
          />
          <button className="btn" type="submit">
            Add
          </button>
        </form>

        <div className="list-container">
          {filteredBookmarks.map(
            (
              bookmark // Changed to filteredBookmarks
            ) => (
              <div className="item" key={bookmark._id}>
                <div className="card-image">
                  <img
                    src="https://i.pinimg.com/236x/dc/ab/7a/dcab7af46cfbde6ace4ba4517add3b1b.jpg"
                    alt={bookmark.name}
                  />
                </div>
                <div className="card-details">
                  {editingId === bookmark._id ? (
                    <>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                      />
                      <button onClick={handleEditSubmit}>Save</button>
                    </>
                  ) : (
                    <>
                      <p>{bookmark.name}</p>
                      <button onClick={() => handleEditClick(bookmark)}>
                        Edit
                      </button>
                      <button onClick={() => confirmDelete(bookmark._id)}>
                        Delete
                      </button>
                      <button onClick={() => openUrl(bookmark.inputValue)}>
                        Open
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </main>
    </>
  );
};

export default Hero;
