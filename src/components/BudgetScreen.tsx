import React, {Component} from 'react'

export default class BudgetScreen extends Component {
    render() {
        return (
            <div className="govuk-panel govuk-panel--confirmation">
                <h1 className="govuk-panel__title">
                    Your Budget Status
                </h1>
                <div className="govuk-panel__body">
                    Your current balance <br/>
                    <strong>230</strong>
                </div>
            </div>
        )
    }
}