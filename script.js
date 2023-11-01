document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generateButton");
    const standardCheckbox = document.getElementById("standardCheckbox");
    const lowPriceCheckbox = document.getElementById("lowPriceCheckbox");
    const popularCheckbox = document.getElementById("popularCheckbox");
    const volumeCheckbox = document.getElementById("volumeCheckbox");
    const menuNameElement = document.getElementById("menuName");

    function generateRandomFishDon() {
        let minRange = 1;
        let maxRange = 154;
        
        if (standardCheckbox.checked) {
            minRange = 1;
            maxRange = 54;
        }
        
        if (lowPriceCheckbox.checked) {
            minRange = Math.max(minRange, 55);
            maxRange = Math.min(maxRange, 135);
        }
        
        if (popularCheckbox.checked) {
            minRange = Math.max(minRange, 136);
            maxRange = Math.min(maxRange, 143);
        }
        
        if (volumeCheckbox.checked) {
            minRange = Math.max(minRange, 144);
            maxRange = Math.min(maxRange, 151);
        }

        return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
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
