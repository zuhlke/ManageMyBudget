import React from 'react';
import MyHeader from './components/MyHeader'
import MyFooter from "./components/MyFooter";
import Content from "./components/Content";
import './App.scss';
import BudgetScreen from "./components/BudgetScreen";


const App: React.FC = () => {
    return (
        <div>
            <MyHeader></MyHeader>
            <div className="govuk-width-container">
                <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-two-thirds">
                            <Content></Content>
                            <button className="govuk-button"> Continue </button>
                        </div>
                    </div>
                </main>
            </div>
            <MyFooter></MyFooter>
        </div>
    );
}

export default App;


// class MainPage extends React.Component<{}, { pageNumber: number }> {
//     constructor(props: any) {
//         super(props);
//         this.handleContinueClick = this.handleContinueClick.bind(this);
//         this.handleBackClick = this.handleBackClick.bind(this);
//         this.state = {pageNumber: 1}
//     }
//
//     handleContinueClick() {
//         this.setState({pageNumber: 2});
//     }
//
//     handleBackClick() {
//         this.setState({pageNumber: 1});
//     }
//
//     render() {
//         const pageNumber = this.state.pageNumber;
//         let button;
//
//         if (pageNumber == 1) {
//             button = <ContinueButton onClick={this.handleContinueClick}/>
//         } else if (pageNumber == 2) {
//             button = <BackButton onClick={this.handleBackClick}/>
//         }
//
//         return (
//             <div>
//                 <MyHeader></MyHeader>
//                 <div className="govuk-width-container">
//                     <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
//                         <div className="govuk-grid-row">
//                             <div className="govuk-grid-column-two-thirds">
//                                 <MyBody pageNumber={pageNumber}></MyBody>
//                                 {button}
//                             </div>
//                         </div>
//                     </main>
//                 </div>
//                 <MyFooter></MyFooter>
//             </div>
//         );
//     }
// }
//
// function MainContent(props: any) {
//     return <Content></Content>;
// }
//
// function BudgetScreen(props: any) {
//     return <BudgetScreen></BudgetScreen>;
// }
//
// export interface HandleProps {
//     pageNumber: number
// }
//
// export const MyBody: React.FC<HandleProps> = ({pageNumber}) => {
//     if (pageNumber == 1) {
//         return <MainContent/>;
//     } else if (pageNumber == 2) {
//         return <BudgetScreen/>
//     }
//
//     return <div></div>
// };
//
// function ContinueButton(props: any) {
//     return (
//         <button className="govuk-button" onClick={props.onClick}> Continue</button>
//     );
// }
//
// function BackButton(props: any) {
//     return (
//         <button className="govuk-button" onClick={props.onClick}> Back </button>
//     );
// }
//
// export default MainPage;