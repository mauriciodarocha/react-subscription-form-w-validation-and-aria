import React from 'react';
import './Dropdown.css'
const initialState = { value: '', text: '' }
const Dropdown = React.forwardRef(({children, label, name, invalid, onSelected, required}, ref) => {
    const wrapperRef = React.useRef();
    const [selection, setSelection] = React.useState({ initialState, ...{value: children[0].props.value || "", text: children[0].props.children }})
    React.useEffect(() => {
        DropdownEvents()
    })
    const onDropdownSelectedItem = (selectedItem) => {
        if (onSelected && 'function' === typeof onSelected) {onSelected({...selectedItem, ...{name, required}})}
    }
    const DropdownEvents = () => {
        const Dropdown = document.getElementById("DropdownComponent");
        if(Dropdown.getAttribute('started')) {return;}
        Dropdown.setAttribute('started', true);

        const DropdownBtn = document.getElementById("DropdownBtn");
        const DroptdownOpts0 = document.querySelector(".dropdown-lst .dd-item:first-child > *:not([selected])")
        const DropdownOpts = document.querySelectorAll(".dropdown-lst .dd-item > *");
        const DropdownArrowBtn = document.querySelector(".Dropdown .dropdown-input-ctn");
        const DropdownOpenClose = (e) => {
            if (e.type==='click' || (e.key && !/ArrowDown|ArrowUp|Tab|Enter/.test(e.key))) {
                e.stopPropagation();
                if (!/open/.test(Dropdown.classList.value)) {
                    Dropdown.classList.add('open')
                } else {
                    Dropdown.classList.remove('open')
                }
            }
            if (e.key && /ArrowDown|ArrowUp/.test(e.key)) {
                Dropdown.classList.add('open')
                let current = [...DropdownOpts].findIndex((e) => { return e.getAttribute('selected') })
                let move = /ArrowDown/.test(e.key) ? current+=1 : /ArrowUp/.test(e.key) ? current-=1 : current;
                if (move>DropdownOpts.length-1) {move = DropdownOpts.length-1}
                if (move<0) {move = 0}
                DropdownOpts.forEach(e => e.removeAttribute('selected'));
                DropdownOpts[move].setAttribute('selected', true);
                const selectedItem = { value: DropdownOpts[move].getAttribute('value') || "", text: DropdownOpts[move].innerText };
                setSelection(selectedItem)
                onDropdownSelectedItem(selectedItem)
            }
            if ((/keydown|keyup/.test(e.type) && !e.key) || (e.key && /Tab|Enter/.test(e.key))) {
                Dropdown.classList.remove('open')
            }
        }
        if(DroptdownOpts0) { DroptdownOpts0.setAttribute('selected', true); }
        DropdownArrowBtn.addEventListener('click', DropdownOpenClose)
        DropdownBtn.addEventListener('click', DropdownOpenClose)
        DropdownBtn.addEventListener('keyup', DropdownOpenClose, true)
        DropdownOpts.forEach((i) => {
            i.addEventListener('click', ({target}) => {
                const selectedItem = { value: target.getAttribute('value') || "", text: target.innerText }
                setSelection(selectedItem)
                DropdownOpts.forEach(e => e.removeAttribute('selected'))
                target.setAttribute('selected',true)
                Dropdown.classList.remove('open')
                onDropdownSelectedItem(selectedItem)
            })
        })

        return true;
    }
    return (
        <div className="Dropdown" id="DropdownComponent" ref={wrapperRef}>
            <div className="dropdown-input-ctn">
                <input
                    type='hidden'
                    ref={ref}
                    name={name}
                    value={selection.value}
                    />
                <button
                    id='DropdownBtn' type='button'
                    className={'dropdown-selector-btn ' + (!selection.value && invalid==='true' ? 'invalid' : '')}
                    aria-label={label}
                    >
                    {selection.text}
                </button>
            </div>
            <div className="dropdown-lst-ctn">
                <ul className="dropdown-lst" role="listbox" id='dd-lst'>
                    {children && children.length > 0 &&
                        children.map((child, index) => {
                            return <li key={'key-'+index} id={'dd-item-'+index} className={'dd-item dd-item-'+index}>{child}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
})
export default Dropdown;

