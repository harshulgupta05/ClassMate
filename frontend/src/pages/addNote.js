import { React, Component, useState, setState } from "react";
import { Router, Link, useLocation, Redirect } from "wouter";

function AddNote() {
    const [location, setLocation] = useLocation();

    const userid = sessionStorage.getItem("user");
    const school = sessionStorage.getItem("school");
    const code = sessionStorage.getItem("course");

    const checkUploadResult = (resultEvent) => {
        if (resultEvent.event === "success") {
            console.log(resultEvent.info);

            fetch(`http://localhost:5000/${school}/${userid}/${code}/addNote`, {
                method: "POST",
                headers: {"Content-Type": "text/plain"},
                mode: "cors",
                body: JSON.stringify({
                    "file": resultEvent.info.secure_url
                })
            }).then(response => response.json()).then((data) => {
                setLocation("/course");
            });
        }
    }

    function showUploadWidget() { 
        window.cloudinary.openUploadWidget({
            cloudName: "detyf81gh",
            uploadPreset: "ClassMate",
            sources: ["local"],
            showAdvancedOptions: true,
            cropping: true,
            multiple: false,
            defaultSource: "local",
            styles: { 
                palette: {
                    window: "#FFFFFF",
                    windowBorder: "#90A0B3",
                    tabIcon: "#0078FF",
                    menuIcons: "#5A616A",
                    textDark: "#000000",
                    textLight: "#FFFFFF",
                    link: "#0078FF",
                    action: "#FF620C",
                    inactiveTabIcon: "#0E2F5A",
                    error: "#F44235",
                    inProgress: "#0078FF",
                    complete: "#20B832",
                    sourceBg: "#E4EBF1"
                },
                fonts: {
                    default: {
                        active: true
                    }
                }    
            }
        }, (err, info) => {   
            if (!err) {
                console.log("Upload Widget event - ", info);
            }  
        }); 
    }

    let widget = window.cloudinary.createUploadWidget({
        cloudName: "detyf81gh",
    }, (error, result) => {
        console.log(result.info.secure_url);
    });

    const showWidget = () => {
        widget.open();
        setLocation("/course");
    }

    return (
        <div className="w-100 text-center ml-auto mr-auto d-flex justify-content-center pt-5 align-items-center">
            <h2 className="display-2 text-center">
                Upload your Note!
            </h2>
            <div className="form-group text-center">
                <label for="noteimage" className="mx-2 form-label">Upload a picture of your notes.</label>
                <button onClick={showUploadWidget} type="submit" className="btn btn-primary">Submit</button>
            </div>              
        </div>
    );
}

export default AddNote;