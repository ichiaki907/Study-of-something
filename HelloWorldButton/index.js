let addButton = document.querySelector('.add');
let count = 0;

addButton.addEventListener('click', () => {

    count++;
    //ボタンが押されたら、div要素にテキストを追加する
    const divElement = document.createElement('div');
    divElement.innerText = `Hello World${count}：`;
    divElement.classList.add("hello");

    //新しいボタンを生成して追加する
    const removeButton = document.createElement('button');
    removeButton.innerText = '削除';
    divElement.appendChild(removeButton);

    //新しいボタンを押したら、div要素を削除する
    removeButton.addEventListener('click', () => {
        divElement.remove();
        if (!document.querySelector(".hello")){
            count = 0;
        }
    });

    //div要素をボタンの下に配置する
    document.body.appendChild(divElement);
});