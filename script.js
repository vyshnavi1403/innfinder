document.addEventListener('DOMContentLoaded', function () {
    const hotelForm = document.getElementById('searchForm');
    const hotelList = document.getElementById('resultsContainer');

    // Mock data for hotels
    const hotels = [
        {
            name: "Hotel Sunshine",
            location: "Chennai",
            price: 1500,
            roomType: "Standard",
            amenities: ["AC", "Pool", "Gym"],
            childrenFriendly: true,
            petFriendly: false,
            image: "images/image1.jpg"
        },
        {
            name: "The Luxe Stay",
            location: "Los Angeles",
            price: 2500,
            roomType: "Deluxe",
            amenities: ["AC", "Gym", "Parking"],
            childrenFriendly: false,
            petFriendly: true,
            image: "images/image2.jpg"
        },
        {
            name: "Family Inn",
            location: "Los Angeles",
            price: 1200,
            roomType: "Family",
            amenities: ["AC", "Pool", "Parking"],
            childrenFriendly: true,
            petFriendly: true,
            image: "images/image3.jpg"
        },
        {
            name: "Budget Stay",
            location: "New York",
            price: 800,
            roomType: "Standard",
            amenities: ["AC"],
            childrenFriendly: false,
            petFriendly: false,
            image: "images/image4.jpg"
        }
    ];

    // Function to filter hotels based on form inputs
    function filterHotels(e) {
        e.preventDefault();

        const location = document.getElementById('location').value.trim().toLowerCase();
        const budget = document.getElementById('budget').value;
        const roomType = document.getElementById('roomType').value.toLowerCase();
        const children = document.getElementById('children').checked;
        const pets = document.getElementById('pets').checked;

        // Collect selected amenities
        const selectedAmenities = Array.from(document.querySelectorAll('input[name="amenities"]:checked')).map(
            (input) => input.value
        );

        // Filter logic
        const filteredHotels = hotels.filter(hotel => {
            const matchesLocation = location === "" || hotel.location.toLowerCase().includes(location);
            const matchesBudget =
                budget === "" ||
                (budget === "low" && hotel.price < 1000) ||
                (budget === "mid-range" && hotel.price >= 1000 && hotel.price <= 2000) ||
                (budget === "premium" && hotel.price > 2000);
            const matchesRoomType = roomType === "" || hotel.roomType.toLowerCase() === roomType;
            const matchesChildren = !children || hotel.childrenFriendly;
            const matchesPets = !pets || hotel.petFriendly;
            const matchesAmenities = selectedAmenities.every(amenity => hotel.amenities.includes(amenity));

            return matchesLocation && matchesBudget && matchesRoomType && matchesChildren && matchesPets && matchesAmenities;
        });

        displayHotels(filteredHotels);
    }

    // Function to display filtered hotels
    function displayHotels(hotels) {
        hotelList.innerHTML = ""; // Clear previous results

        if (hotels.length === 0) {
            hotelList.innerHTML = "<p>No hotels found with the selected criteria.</p>";
            return;
        }

        hotels.forEach(hotel => {
            const hotelCard = document.createElement("div");
            hotelCard.classList.add("result-item");

            hotelCard.innerHTML = `
                <img src="${hotel.image}" alt="${hotel.name}">
                <h3>${hotel.name}</h3>
                <p><strong>Location:</strong> ${hotel.location}</p>
                <p><strong>Price:</strong> ₹${hotel.price}</p>
                <p><strong>Room Type:</strong> ${hotel.roomType}</p>
                <p><strong>Amenities:</strong> ${hotel.amenities.join(", ")}</p>
                <p><strong>Children Friendly:</strong> ${hotel.childrenFriendly ? "Yes" : "No"}</p>
                <p><strong>Pet Friendly:</strong> ${hotel.petFriendly ? "Yes" : "No"}</p>
            `;

            hotelList.appendChild(hotelCard);
        });
    }

    // Event listener for form submission
    hotelForm.addEventListener("submit", filterHotels);

    // Display all hotels initially
    displayHotels(hotels);
});
