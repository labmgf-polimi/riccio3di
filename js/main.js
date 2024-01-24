//Defining a start exploring action to hide welcome panel
function hideWelcomePanel() {
    var welcomePanel = document.getElementById('container');
    welcomePanel.style.visibility = "hidden";
    console.log("Hiddening welcomePanel");
}

//Fly to a specific oriented image
function flyToImage(image, chunk) {
    Potree.debug.moveToImage(viewer.scene.orientedImages.find(element => element.name == chunk).images.find(element => element.id == image));
}

//Defining a searchInArray function that links oriented image id string with the file name of it in a given array
function searchInArray(array, searchString) {
    const lowerCaseSearchString = searchString.toLowerCase();

    return array.filter(obj => {
        if (obj.title && typeof obj.title === 'string') {
            return obj.title.toLowerCase() === lowerCaseSearchString;
        }
        return false;
    }).map(obj => {
        return {
            title: obj.title,
            artist: obj.artist,
            file: obj.file,
            youtube: obj.youtube,
            year: obj.year,
            medium: obj.medium,
            dimensions: obj.dimensions,
        };
    });
}

//Testing updated version of flyToSuggestion
function flyToSuggestion(array, searchString) {
    var searchResult = searchInArray(array, searchString);
    if (searchResult.length > 0) {
        updateInfoPanel(searchResult[0]);
        flyToImage(searchResult[0].file, "artworks");
    } else {
        // Handle case where no artwork is found
        console.log("No artwork found for", searchString);
    }
}

//Populating the Info Panel with technical details about the highlighted artwork
function updateInfoPanel(artwork) {
    document.getElementById('info-title').textContent = artwork.title;
    document.getElementById('info-artist').innerHTML = '<b>Artist:</b> ' + artwork.artist;
    //var iframe = document.getElementById('info-iframe');
    //iframe.src = artwork.youtube;
    var youtubeLink = document.getElementById('info-youtube');
    youtubeLink.setAttribute('href', artwork.youtube);
    youtubeLink.setAttribute('target', '_blank');
    document.getElementById('info-year').innerHTML = '<b>Year:</b> ' + artwork.year;
    document.getElementById('info-medium').innerHTML = artwork.medium;
    document.getElementById('info-dimensions').innerHTML = artwork.dimensions;
    document.getElementById('info-panel').style.display = 'block';
}

//This has been added to the potree.js code to. Remove it if it's not working
function hideInfoPanel() {
    document.getElementById('info-panel').style.display = 'none';
    document.getElementById('info-iframe').src = '';
}

//Search bar code
const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.getElementById('suggestions');

//Checking the user input in the search bar
searchInput.addEventListener('input', () => {
    const inputText = searchInput.value;
    if (inputText) {
        const suggestions = getSuggestions(inputText).slice(0, 3);
        displaySuggestions(suggestions);
        console.log("Displaying list of suggestions")
    } else {
        suggestionsContainer.style.display = 'none';
        console.log("No matches found for suggestions")
    }
});

//Retrieving artwork title suggestion list based on the search bar input
function getSuggestions(searchString) {
    return artworks.filter(obj => {
        if (obj.title && typeof obj.title === 'string') {
            return obj.title.toLowerCase().includes(searchString.toLowerCase());
        }
        return false;
    }).map(obj => obj.title);
}

//Showing artwork title suggestions
function displaySuggestions(suggestions) {
    if (suggestions.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
    }
    suggestionsContainer.innerHTML = '';
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.classList.add('suggestion');
        div.textContent = suggestion;
        div.onclick = () => flyToSuggestion(artworks, suggestion);
        suggestionsContainer.appendChild(div);
    });
    suggestionsContainer.style.display = 'block';
}

// Toggling legend panel and switching pointcloud colors
function toggleLegendPanel() {
    var panel = document.getElementById("legend_panel");
    if (panel.style.display === "none" || panel.style.display === "") {
        panel.style.display = "block";
        changePCcolor("tls", 1, 0, 0);
        changePCcolor("photogrammetry", 0, 1, 0);
        changePCcolor("slam", 0, 0, 1);
    } else {
        panel.style.display = "none";
        setRGBA("tls");
        setRGBA("photogrammetry");
        setRGBA("slam");
    }

}
//Defining function to change color of a point cloud to a uniform RGB combination
function changePCcolor(source, r, g, b) {
    const targetPointCloud = viewer.scene.pointclouds.find(element => element.name === source);
    targetPointCloud.material.activeAttributeName = "color";
    const newColor = new THREE.Color(r, g, b); // RGB values for new color
    if (targetPointCloud) {
        targetPointCloud.material.color = newColor;
    }
}
//Defining function to change color of a point cloud to RGB
function setRGBA(source) {
    const targetPointCloud = viewer.scene.pointclouds.find(element => element.name === source);
    targetPointCloud.material.activeAttributeName = "rgba";
}

// TEST WITH MULTIPLE OBJECTS
// Array of room bounding boxes
const rooms = [
    {
        name: "Room I",
        minX: 554495.642,
        minY: 4988582.288,
        minZ: 96.953,
        maxX: 554505.112,
        maxY: 4988593.742,
        maxZ: 100.095,
    },
    {
        name: "Room II",
        minX: 554493.678,
        minY: 4988576.068,
        minZ: 96.887,
        maxX: 554501.126,
        maxY: 4988583.934,
        maxZ: 100.503,
    },
    {
        name: "Room III",
        minX: 554491.032,
        minY: 4988566.882,
        minZ: 96.903,
        maxX: 554500.218,
        maxY: 4988577.389,
        maxZ: 100.178,
    },
    {
        name: "Room IV",
        minX: 554494.769,
        minY: 4988560.143,
        minZ: 96.916,
        maxX: 554502.284,
        maxY: 4988565.898,
        maxZ: 101.03,
    },
    {
        name: "Room V",
        minX: 554486.562,
        minY: 4988558.979,
        minZ: 96.913,
        maxX: 554494.352,
        maxY: 4988567.204,
        maxZ: 100.242,
    },
    {
        name: "Room VI",
        minX: 554490.22,
        minY: 4988556.304,
        minZ: 96.915,
        maxX: 554495.852,
        maxY: 4988561.128,
        maxZ: 100.829,
    },
    {
        name: "Room VII",
        minX: 554491.674,
        minY: 4988548.936,
        minZ: 97.037,
        maxX: 554499.923,
        maxY: 4988557.181,
        maxZ: 100.137,
    },
    {
        name: "Room VIII",
        minX: 554478.858,
        minY: 4988550.708,
        minZ: 96.988,
        maxX: 554487.698,
        maxY: 4988561.208,
        maxZ: 100.31,
    },
    {
        name: "Room IX",
        minX: 554479.859,
        minY: 4988543.01,
        minZ: 97.2,
        maxX: 554489.946,
        maxY: 4988551.742,
        maxZ: 100.43,
    },
    {
        name: "Room X",
        minX: 554487.845,
        minY: 4988547.415,
        minZ: 97.194,
        maxX: 554492.916,
        maxY: 4988552.692,
        maxZ: 100.768,
    },
    {
        name: "Room XI",
        minX: 554488.773,
        minY: 4988540.217,
        minZ: 96.935,
        maxX: 554496.382,
        maxY: 4988546.097,
        maxZ: 100.599,
    },
    {
        name: "Room XII",
        minX: 554484.159,
        minY: 4988534.912,
        minZ: 97.102,
        maxX: 554489.38,
        maxY: 4988542.608,
        maxZ: 99.139,
    },
    {
        name: "Room XIII",
        minX: 554492.392,
        minY: 4988532.76,
        minZ: 96.871,
        maxX: 554498.517,
        maxY: 4988539.52,
        maxZ: 100.067,
    },
    {
        name: "Room XIV",
        minX: 554495.665,
        minY: 4988545.425,
        minZ: 97.172,
        maxX: 554501.785,
        maxY: 4988549.912,
        maxZ: 100.464,
    },
    {
        name: "Room XV",
        minX: 554497.212,
        minY: 4988537.45,
        minZ: 97.156,
        maxX: 554506.085,
        maxY: 4988547.224,
        maxZ: 100.493,
    },
    {
        name: "Room XVI",
        minX: 554503.949,
        minY: 4988543.577,
        minZ: 97.226,
        maxX: 554512.854,
        maxY: 4988555.449,
        maxZ: 100.236,
    },
    {
        name: "Room XVII",
        minX: 554501.694,
        minY: 4988554.562,
        minZ: 97.201,
        maxX: 554511.255,
        maxY: 4988563.426,
        maxZ: 100.344,
    },
    {
        name: "Room XVIII",
        minX: 554498.609,
        minY: 4988553.367,
        minZ: 97.196,
        maxX: 554503.842,
        maxY: 4988559.072,
        maxZ: 100.521,
    },
    {
        name: "Room XIX",
        minX: 554501.662,
        minY: 4988563.583,
        minZ: 96.944,
        maxX: 554510.894,
        maxY: 4988574.269,
        maxZ: 100.344,
    },
    {
        name: "Room XX",
        minX: 554505.286,
        minY: 4988572.612,
        minZ: 96.924,
        maxX: 554512.779,
        maxY: 4988580.501,
        maxZ: 100.396,
    },
    {
        name: "Room XXI",
        minX: 554506.254,
        minY: 4988579.184,
        minZ: 97.137,
        maxX: 554515.76,
        maxY: 4988590.651,
        maxZ: 100.123,
    },
    {
        name: "Room XXII",
        minX: 554500.194,
        minY: 4988574.578,
        minZ: 96.954,
        maxX: 554506.324,
        maxY: 4988581.995,
        maxZ: 101.587,
    },
    // Add more room objects as needed
];

window.viewer = new Potree.Viewer(document.getElementById("potree_render_area"));

// Function to check if a point is inside a room bounding box
function isInsideRoom(point, room) {
    return (
        point.x >= room.minX &&
        point.x <= room.maxX &&
        point.y >= room.minY &&
        point.y <= room.maxY &&
        point.z >= room.minZ &&
        point.z <= room.maxZ
    );
}

// test
let currentRoom = null; // Variable to store the current room

function displayRoomBanner(roomName) {
    let bannerElement = document.getElementById("roomBanner");

    // Create or update the banner element
    if (!bannerElement) {
        bannerElement = document.createElement("div");
        bannerElement.id = "roomBanner";
        bannerElement.style.position = "fixed";
        bannerElement.style.bottom = "20px";
        bannerElement.style.left = "50%";
        bannerElement.style.transform = "translateX(-50%)";
        bannerElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        bannerElement.style.color = "white";
        bannerElement.style.padding = "10px";
        bannerElement.style.borderRadius = "5px";
        bannerElement.style.zIndex = "9999";
        document.body.appendChild(bannerElement);
    }

    // Update the banner content if the room has changed
    if (roomName !== currentRoom) {
        bannerElement.textContent = `${roomName}`;
        currentRoom = roomName; // Update the current room
    }

    // Display the banner
    bannerElement.style.display = "block";

    // Set a timeout to hide the banner after a few seconds (adjust as needed)
    setTimeout(() => {
        bannerElement.style.display = "none";
    }, 3000); // Hide after 3 seconds (adjust as needed)
}

// Update the checkCameraPosition function to display the banner when entering a different room
function checkCameraPosition() {
    const cameraPosition = viewer.scene.getActiveCamera().position;
    let isInsideAnyRoom = false;

    // Iterate through the array of room bounding boxes
    for (const room of rooms) {
        const isInside = isInsideRoom(cameraPosition, room);

        if (isInside) {
            if (currentRoom !== room.name) {
                console.log(`Camera entered ${room.name}.`);
                displayRoomBanner(room.name);
                isInsideAnyRoom = true;
                currentRoom = room.name; // Update the current room
            }
            return; // Exit the loop if the camera is inside any room
        }
    }

    if (!isInsideAnyRoom) {
        console.log("Camera is outside all rooms.");

        // Reset the current room
        currentRoom = null;
    }
}

// Add event listener for camera changes
viewer.addEventListener("camera_changed", checkCameraPosition);

// Add event listener for mouse events
document.addEventListener("mousemove", checkCameraPosition);
document.addEventListener("mousedown", checkCameraPosition);
document.addEventListener("mouseup", checkCameraPosition);
document.addEventListener("wheel", checkCameraPosition);

// Initial check when the page loads
checkCameraPosition();
