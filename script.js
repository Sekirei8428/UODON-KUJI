document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generateButton");
    const randomFishDonElement = document.getElementById("randomFishDon");
    const menuNameElement = document.getElementById("menuName");

    function generateRandomFishDon() {
        return Math.floor(Math.random() * 154) + 1;
    }

    function updateMenuName(randomFishDon) {
        // menu.jsonファイルを読み込む
        fetch('./menu.json')
            .then(response => response.json())
            .then(data => {
                // ランダムな番号に対応する名前を取得
                const menuName = data[randomFishDon];

                if (menuName) {
                    menuNameElement.textContent = "今日の海鮮丼:" + menuName.name;
                } else {
                    menuNameElement.textContent = "今日の海鮮丼:メニューがありません";
                }
            })
            .catch(error => {
                console.error('メニュー情報の読み込み中にエラーが発生しました:', error);
            });
    }

    generateButton.addEventListener("click", function() {
        let randomFishDon = generateRandomFishDon();
        randomFishDonElement.textContent = randomFishDon;
        updateMenuName(randomFishDon);
    });
});
