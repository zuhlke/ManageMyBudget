import React, {useState} from 'react';
import MyHeader from './components/MyHeader'
import MyFooter from "./components/MyFooter";
import Content from "./components/Content";
import './App.scss';
import BudgetScreen from "./components/BudgetScreen";

const MainPage = () => {
    const[page, setPage] = useState(1)

    let button
    let myContent

    if (page == 1) {
        button = <ContinueButton onClick={() => setPage(2)}/>
        myContent = LoadMainPage()
    } else {
        button = <BackButton onClick={() => setPage(1)}/>
        myContent = LoadBudgetScreen()
    }
    return (
        <div>
            <MyHeader></MyHeader>
            <div className="govuk-width-container">
                <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-two-thirds">
                            {myContent}
                            {button}
                        </div>
                    </div>
                </main>
            </div>
            <MyFooter></MyFooter>
        </div>
    )
}

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
    return <Content/>
}

function LoadBudgetScreen() {
    return <BudgetScreen/>
}

export default MainPage