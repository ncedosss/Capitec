const template = document.createElement('template');
template.innerHTML = `
    <style>
        @import "main.css"
    </style>
    <div class="calculatorForm"><h1>Calculator</h1></div>
    <div class="main">
        <form>
            <div id="amount">
                <h2 class="heading">Amount: </h2>
                <input class="totalAmount" id="total-amount" type="text" name="total_amount" placeholder="How much do you have?"/>
                <label id="errorText" hidden>Incorrect Format</label>
            </div>
            <button type="button" id="calculate">Calculate</button>
            
            <div id="resultsAmount" hidden>
                <h2 class="resultsHeading">Results: </h2>
                <input class="totalAmountResults" id="total-amount-results" type="text" name="total_amount" readonly/>
                <label id="errorText" hidden>Incorrect Format</label>
            </div>

            <div id="hideMe">

            </div>
        </form>
    </div>
`;
class SharesCalculator extends HTMLElement {
    constructor(){
        super();

        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h1').innerText = this.getAttribute('name');
    }
    Calculate(totalAmount){
        
        var reg = new RegExp(/^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/);
        if(totalAmount == ""){
            this.shadowRoot.querySelector('#total-amount').classList.add('error');
        }
        else if(!reg.test(totalAmount)){
            this.shadowRoot.querySelector('#errorText').classList.add('showMe');
        }
        else{

            var currentSharePrice = 167241;
            var results = parseFloat((totalAmount/currentSharePrice) * 100);
            this.shadowRoot.querySelector('#total-amount-results').value = Math.round(results);
            this.shadowRoot.querySelector('#errorText').classList.remove('showMe');
            this.shadowRoot.querySelector('#total-amount').classList.remove('error');
            this.shadowRoot.querySelector('#resultsAmount').classList.add('showMe');
        }
    }

    RemoveRedBorder(totalAmount){

        if(totalAmount != ""){
            this.shadowRoot.querySelector('#total-amount').classList.remove('error');
        }
        else{
            this.shadowRoot.querySelector('#errorText').classList.remove('showMe');
            this.shadowRoot.querySelector('#total-amount').classList.add('error');
        }
        
    }

    connectedCallback(){
        this.shadowRoot.querySelector('#calculate').addEventListener('click', () => this.Calculate(this.shadowRoot.querySelector('#total-amount').value));
        this.shadowRoot.querySelector('#total-amount').addEventListener('change', () => this.RemoveRedBorder(this.shadowRoot.querySelector('#total-amount').value));
    }
    disconnectedCallback(){
        this.shadowRoot.querySelector('#calculate').removeEventListener();
    }
}

window.customElements.define('shares-calculator',SharesCalculator);