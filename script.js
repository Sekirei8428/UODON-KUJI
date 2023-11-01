document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generateButton");
    const randomFishDonElement = document.getElementById("randomFishDon");
    const seafoodDonImage = document.getElementById("seafoodDonImage");

    function generateRandomFishDon() {
        return Math.floor(Math.random() * 154) + 1;
    }

    function updateSeafoodDonImage(randomFishDon) {
        seafoodDonImage.src = "http://uodon.jp/wp-content/themes/uodon-hp/img_menu45/" + randomFishDon + ".jpg";
    }

    generateButton.addEventListener("click", function() {
        let randomFishDon = generateRandomFishDon();

        if (standardCheckbox.checked) {
            while (randomFishDon < 1 || randomFishDon > 54) {
                randomFishDon = generateRandomFishDon();
            }
        } else if (lowPriceCheckbox.checked) {
            while (randomFishDon < 55 || randomFishDon > 135) {
                randomFishDon = generateRandomFishDon();
            }
        } else if (popularCheckbox.checked) {
            while (randomFishDon < 136 || randomFishDon > 143) {
                randomFishDon = generateRandomFishDon();
            }
        } else if (volumeCheckbox.checked) {
            while (randomFishDon < 144 || randomFishDon > 154) {
                randomFishDon = generateRandomFishDon();
            }
        } else {
            randomFishDon = "チェックボックスを選択してください";
        }

        randomFishDonElement.textContent = randomFishDon;
        updateSeafoodDonImage(randomFishDon);
        fetch('./menu.csv')
        .then(response => response.text())
        .then(data => {
            const menuArray = data.split('\n');
            const menuData = {};
            menuArray.forEach(menuItem => {
                const [menuNumber, menuName] = menuItem.split(',');
                menuData[menuNumber] = menuName;
            });

            if (menuData[randomFishDon]) {
                menuNameElement.textContent = "メニュー名: " + menuData[randomFishDon];
            } else {
                menuNameElement.textContent = "メニュー名: メニューがありません";
            }
        })
        .catch(error => {
            console.error('メニュー情報の読み込み中にエラーが発生しました:', error);
        });
    });
});
