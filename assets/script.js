window.onload = function () {
    let submitButton = this.document.getElementById("submitButton");
    let resultSection = window.document.getElementById("resultSection");
    submitButton.onclick = function (e) {
        e.preventDefault();
        let imageIDs = window.document.getElementById("imageIDsList");
        if (imageIDs.value.length == 0) {
            alert("Enter some Image IDs");
            return;
        }


        let progressBar = window.document.getElementById("progressBar");
        let progressBarChild = window.document.getElementById("progressBarValue");
        resultSection.innerHTML = "<div><strong>Loading</strong></div>";

        progressBarChild.style = "width: 0%";
        progressBar.style = "display: block";
        submitButton.style = "display: none"
        submitButton.disabled = true;
        getImagesData(imageIDs.value);
    }

    async function getImagesData(imageIDs) {
        let progressBarChild = window.document.getElementById("progressBarValue");
        let idArrays = imageIDs.split(",");
        for (let index = 0; index <= idArrays.length; index++) {
            let imageID = idArrays[index];
            let percentage = (index / idArrays.length) * 100;
            if (imageID) {
                imageID = imageID.trim();
                let response = await fetch('https://namco-refurbs.com/wp-json/wp/v2/media/' + imageID);
                if (index == 0) {
                    resultSection.innerHTML = "";
                }

                if (response.status === 200) {
                    let data = await response.json();
                    let link = data.source_url;
                    let imageName = link.substring(link.lastIndexOf("/") + 1, link.length);
                    let element = window.document.createElement("div");
                    element.innerHTML = "<strong>" + imageID + "   -   " + imageName + "</strong>";
                    resultSection.appendChild(element);
                }
            }

            progressBarChild.style = "width: " + percentage + "%";
            if (index == idArrays.length) {
                let progressBar = window.document.getElementById("progressBar");
                progressBar.style = "display: none";
                submitButton.style = "display: block";
                submitButton.disabled = false;
            }
        }
    }
}

{/* <div><strong>No Result</strong></div> */ }