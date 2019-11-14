import React, { useState } from 'react';
import MyHeader from './components/MyHeader'
import MyFooter from "./components/MyFooter";
import Content from "./components/Content";
import './App.scss';
import BudgetFunctionalComponent from "./components/BudgetScreen";

function defineButtonAndContent(page: any, setPage: any) {
    let button, myContent;

    if (page == 1) {
        button = <ContinueButton onClick={() => setPage(3)} />;
        myContent = LoadMainPage();
    } else {
        button = <BackButton onClick={() => setPage(1)} />;
        myContent = LoadBudgetScreen();
    }

    return { button, myContent };
}

const MainPage = () => {
    const [page, setPage] = useState(1);

    const customContent = defineButtonAndContent(page, setPage);
    return (
        <div>
            <MyHeader />
            <div className="govuk-width-container">
                <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-two-thirds">
                            {customContent.myContent}
                            {customContent.button}
                        </div>
                    </div>
                </main>
            </div>
            <MyFooter />
        </div>
    );
};

function ContinueButton(props: any) {
    return (
        <button className="govuk-button" onClick={props.onClick}> Continue</button>
    );
}

function BackButton(props: any) {
    return (
        <button className="govuk-button" onClick={props.onClick}> Back </button>
    );
}

function LoadMainPage() {
    return <Content />
}

function LoadBudgetScreen() {
    return <BudgetFunctionalComponent />
}

export default MainPage