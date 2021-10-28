import React from 'react';
import './Modal.css';

export default class Modal extends React.Component{
    render(){
        const { open, close, nameTxt, dayTxt, contentTxt, imgURL} = this.props;

        return (
            <div className={open ? 'openModal modal': 'modal'}>
                { open ? (
                    <section>
                        <header>
                            {nameTxt}
                            <button className="close" onClick={close}>&times;</button>
                        </header>
                        <main>
                            <img src={imgURL} alt="" />
                            <p className="modal_text">
                            <span className="modal_day">{dayTxt}</span>
                            {contentTxt}
                            </p>
                        </main>
                        <footer>
                        </footer>
                    </section>
                    ): null}
            </div>

        )
    }
}