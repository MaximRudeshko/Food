function cards(){
    //cards

    class MenuCard{
        constructor(src, altimg, title, discription, price, parentSelector){
            this.src = src,
            this.altimg = altimg,
            this.title = title,
            this.discription = discription,
            this.price = price,
            this.parent = document.querySelector(parentSelector)
        }

        render(){
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt="vegy">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.discription}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    async function getData(url){
        let res = await fetch(url)
        if(! res.ok){
            throw new Error(`${res.status}`)
        }
        return await res.json();
    }

    /* getData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img,altimg,title,descr,price}) => {
                new MenuCard(img,altimg,title,descr,price, '.menu .container').render()
            })
        }) */

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img,altimg,title,descr,price}) => {
                new MenuCard(img,altimg,title,descr,price, '.menu .container').render()
            })        
        })

}

module.exports = cards;