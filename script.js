document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generateButton");
    const standardCheckbox = document.getElementById("standardCheckbox");
    const lowPriceCheckbox = document.getElementById("lowPriceCheckbox");
    const popularCheckbox = document.getElementById("popularCheckbox");
    const volumeCheckbox = document.getElementById("volumeCheckbox");
    const menuNameElement = document.getElementById("menuName");
    function generateRandomFishDon() {
        let randomFishDon;
    
        do {
            randomFishDon = Math.floor(Math.random() * 151) + 1;
        } while ((standardCheckbox.checked && (randomFishDon < 1 || randomFishDon > 54)) ||
                 (lowPriceCheckbox.checked && (randomFishDon < 55 || randomFishDon > 135)) ||
                 (popularCheckbox.checked && (randomFishDon < 136 || randomFishDon > 143)) ||
                 (volumeCheckbox.checked && (randomFishDon < 144 || randomFishDon > 151)));
        {
            randomFishDon = Math.floor(Math.random() * 151) + 1;
        }
        return randomFishDon;
    }
    

    function updateMenuName(randomFishDon) {
        fetch('./menu.json')
            .then(response => response.json())
            .then(data => {
                const menuName = data[randomFishDon];
                if (menuName) {
                    menuNameElement.textContent = "メニュー名: " + menuName.name;
                } else {
                    menuNameElement.textContent = "メニュー名: メニューがありません";
                }
                console.log("メニュー番号: " + randomFishDon);
            })
            .catch(error => {
                console.error('メニュー情報の読み込み中にエラーが発生しました:', error);
            });
    }

    generateButton.addEventListener("click", function() {
        let randomFishDon = generateRandomFishDon();
        updateMenuName(randomFishDon);
    });
});
