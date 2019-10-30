import React, {Component} from 'react'

export default class Content extends Component {
    render() {
        return (
            <div className="govuk-width-container">
                <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-two-thirds">
                            <h1 className="govuk-heading-xl">Welcome to Manage My Budget Service</h1>
                            <script>console.log("v0.01");</script>
                            <p>This project is aimed to help vulnerable people to manage their budget.</p>

                            <h2 className="govuk-heading-m">Project Objectives</h2>
                            <ul className="govuk-list govuk-list--bullet">
                                <li>How customers can manage different accounts and income sources, including benefit payments.</li>
                                <li>Ways to help people save.</li>
                                <li>Helping people understand and manage regular outgoing payments, such as utility bills.</li>
                                <li>Reducing people's reliance on credit cards and money lenders.</li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}