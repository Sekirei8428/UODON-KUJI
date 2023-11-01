document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generateButton");
    const standardCheckbox = document.getElementById("standardCheckbox");
    const lowPriceCheckbox = document.getElementById("lowPriceCheckbox");
    const popularCheckbox = document.getElementById("popularCheckbox");
    const volumeCheckbox = document.getElementById("volumeCheckbox");
    const menuNameElement = document.getElementById("menuName");
    function generateRandomFishDon() {
        let randomFishDon;
        while(true){
            randomFishDon = Math.floor(Math.random()*(151-1+1)) + 1;
            
            if(standardCheckbox.checked&&(randomFishDon>=1&&randomFishDon<=54)) break;
            if(lowPriceCheckbox.checked&&(randomFishDon>=55&&randomFishDon<=135)) break;
            if(popularCheckbox.checked&&(randomFishDon>=136&&randomFishDon<=143)) break;
            if(volumeCheckbox.checked&&(randomFishDon>=144&&randomFishDon<=151)) break;
        }
        return randomFishDon
    }
    

    function updateMenuName(randomFishDon) {
        fetch('./menu.json')
            .then(response => response.json())
            .then(data => {
                const menuName = data[randomFishDon-1];
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
