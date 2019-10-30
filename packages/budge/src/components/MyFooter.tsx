import React, {Component} from 'react'

export default class MyFooter extends Component {
    render() {
        return (
            <footer className="govuk-footer" role="contentinfo">
                <div className="govuk-width-container">
                    <div className="govuk-footer__meta">
                        <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">

                        </div>
                        <div className="govuk-footer__meta-item">
                            <a className="govuk-footer__link govuk-footer__copyright-logo"
                               href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/">©
                                Crown copyright</a>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}