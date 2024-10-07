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

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input || !urlname) {
      toast.error("Both URL and Bookmark Name are required!");
      return; // Exit the function early
    }

    
    const fullUrl =
      input.startsWith("http://") || input.startsWith("https://")
        ? input
        : `http://${input}`;

    try {
      const response = await axios.post("http://localhost:7000/api/input", {
        inputValue: fullUrl, 
        name: urlname, 
      });

      
      setBookmarks((prevBookmarks) => [...prevBookmarks, response.data.data]);

      toast.success("Bookmark added successfully!");
      setInput("");
      setUrlname("");
    } catch (err) {
      toast.error("Error adding bookmark: " + err.message);
      console.error("Error adding bookmark:", err); 
    }
  };


  // Fetch all data from the database
  const fetchAlldata = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/inputs");
      const data = response.data.data;
      console.log("Fetched bookmarks:", data); 
      setBookmarks(data);
    } catch (err) {
      toast.error("Error fetching bookmarks: " + err.message);
      console.error("Error fetching bookmarks:", err); 
    }
  };

  
  useEffect(() => {
    fetchAlldata();
  }, []);


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
      console.error("Error editing bookmark:", err); 
    }
  };

  // Delete option
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

  // Search feature
  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open the URL setup
  const openUrl = (url) => {
    window.open(url, "_blank");
    console.log(url);
  };

  const getDomain = (url) => {
    try {
      return new URL(url).hostname;
    } catch (err) {
      console.error("Error getting domain:", err);
      return "";
    }
  };

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="hero">
        <h1>Save Your BookMarks</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter the URL"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter the BookMark Name"
            className="name"
            value={urlname}
            onChange={(e) => setUrlname(e.target.value)}
          />
          <button className="btn" type="submit">
            Add
          </button>
        </form>

        <div className="list-container">
          {filteredBookmarks.map((bookmark) => (
            <div className="item" key={bookmark._id}>
              <div className="card-image">
                <img
                  src={`https://logo.clearbit.com/${getDomain(
                    bookmark.inputValue
                  )}`}
                  alt={bookmark.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
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
                    <h4>{bookmark.name}</h4>
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
          ))}
        </div>
      </main>
    </>
  );
};

export default Hero;
