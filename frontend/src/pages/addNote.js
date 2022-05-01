import { React, Component, useState, setState } from "react";
import { Router, Link, useLocation, Redirect } from "wouter";

function AddNote() {
    const [location, setLocation] = useLocation();

    const userid = sessionStorage.getItem("user");
    const school = sessionStorage.getItem("school");
    const code = sessionStorage.getItem("course");

    const checkUploadResult = (resultEvent) => {
        if (resultEvent.event === "success") {
            fetch(`http://localhost:5000/${school}/${userid}/${code}/addNote`, {
                method: "POST",
                headers: {"Content-Type": "text/plain"},
                mode: "cors",
                body: JSON.stringify({
                    "file": resultEvent.info.secure_url
                })
            }).then(response => response.json()).then((data) => {

            });
        }
    }

    let widget = window.cloudinary.createUploadWidget({
        cloudName: "",
        uploadPreset: "ClassMate"
    }, (error, result) => checkUploadResult(result));

    const showWidget = () => {
        widget.open();
    }
}

export default AddNote;