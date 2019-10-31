import React, {Component} from 'react'

class Budget {
    income: number = 0.0;
    outgoing: number = 0.0;

    constructor(public inc: number, public out: number) {
        this.income = inc;
        this.outgoing = out;
    }
}

function calculateBudget(budget: Budget) {
    return (budget.income - budget.outgoing).toFixed(2);
}

function showMessage(balance: number) {
    if (balance >= 0) {
        return "You have enough money in your account.";
    }

    return "You do not have enough money in your account."
}

let budget = new Budget(Math.random()*1000 + 1, Math.random() * 1000 + 1);
let balance = calculateBudget(budget);

export default class BudgetScreen extends Component {
    render() {
        return (
            <div className="govuk-panel govuk-panel--confirmation">
                <h2 className="govuk-panel__title">
                    {showMessage(+balance)}
                </h2>
                <div className="govuk-panel__body">
                    Your current balance <br/>
                    <strong>{balance}</strong>
                </div>
            </div>
        )
    }
}