// Get DOM elements
const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const cpuResult = document.querySelector(".cpu_result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option_item img");

// Game options array
const options = ["tas", "kagit", "makas"];

// Function to get computer choice
const getComputerChoice = () => {
    const randomNum = Math.floor(Math.random() * 3);
    return options[randomNum];
};

// Function to determine winner
const getWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) return "Berabere!";
    
    if (userChoice === "tas") {
        return computerChoice === "makas" ? "Kazandın!" : "Kaybettin!";
    } else if (userChoice === "kagit") {
        return computerChoice === "tas" ? "Kazandın!" : "Kaybettin!";
    } else { // makas
        return computerChoice === "kagit" ? "Kazandın!" : "Kaybettin!";
    }
};

// Function to update images
const updateImages = (userChoice, computerChoice) => {
    // Türkçe seçimleri İngilizce dosya adlarına çevirme
    const getImageName = (choice) => {
        switch(choice) {
            case "tas": return "rock";
            case "kagit": return "paper";
            case "makas": return "scissors";
            default: return choice;
        }
    };
    
    userResult.src = `${getImageName(userChoice)}.png`;
    cpuResult.src = `${getImageName(computerChoice)}.png`;
};

// Animasyon fonksiyonu
const playAnimation = () => {
    gameContainer.classList.add("shake-animation");
    
    // Animasyonu sıfırlamak için class'ı kaldır
    setTimeout(() => {
        gameContainer.classList.remove("shake-animation");
    }, 2400); // 3 kere sallanma için 2.4 saniye (0.8s * 3)
};

// Add click event to all option images
optionImages.forEach((image) => {
    image.addEventListener("click", () => {
        // Remove active class from all images
        optionImages.forEach(img => img.classList.remove("active"));
        
        // Add active class to clicked image
        image.classList.add("active");
        
        // Get user choice from image's alt text
        const userChoice = image.alt.toLowerCase() === "rock" ? "tas" : 
                                     image.alt.toLowerCase() === "paper" ? "kagit" : "makas";
        
        // Önce animasyonu başlat
        playAnimation();
        
        // Bilgisayar seçimini ve görselleri güncelle
        setTimeout(() => {
            const computerChoice = getComputerChoice();
            updateImages(userChoice, computerChoice);
            
            // Sonucu göster
            const gameResult = getWinner(userChoice, computerChoice);
            result.textContent = gameResult;
            
            // Sonuç için stil sınıfını ekle
            result.className = "result";
            if (gameResult === "Kazandın!") {
                result.classList.add("win");
            } else if (gameResult === "Kaybettin!") {
                result.classList.add("lose");
            } else {
                result.classList.add("draw");
            }
        }, 2000); // Son sallanmadan hemen önce görselleri güncelle
        

    });
});