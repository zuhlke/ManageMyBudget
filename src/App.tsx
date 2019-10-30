import React from 'react';
import MyHeader from './components/MyHeader'
import MyFooter from "./components/MyFooter";
import Content from "./components/Content";
import './App.scss';


const App: React.FC = () => {
    return (
        <div>
            <MyHeader></MyHeader>
            <div className="govuk-width-container">
                <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-two-thirds">
                            <Content></Content>
                        </div>
                    </div>
                </main>
            </div>
            <MyFooter></MyFooter>
        </div>
    );
}

export default App;