import React from 'react';
import './Dropdown.css'
const initialState = { value: '', text: '' }
const Dropdown = React.forwardRef(({children, label, name, error, onSelected, message, ...inputProps}, ref) => {
    const wrapperRef = React.useRef();
    const [selection, setSelection] = React.useState({ initialState, ...{value: children[0].props.value || "", text: children[0].props.children }})
    const [ariaLabel, setAriaLabel] = React.useState(label + ' ' + children[0].props.children)
    React.useEffect(() => {
        DropdownEvents()
    })
    const onDropdownSelectedItem = (selectedItem) => {
        if (onSelected && 'function' === typeof onSelected) {onSelected({...selectedItem, ...{name, message}})}
    }
    const DropdownEvents = () => {
        const Dropdown = document.getElementById("DropdownComponent");
        if(Dropdown.getAttribute('started')) {return;}
        Dropdown.setAttribute('started', true);

        const DropdownBtn = document.getElementById("DropdownBtn");
        const DropdownList = document.getElementById("DropdownList");
        const DroptdownOpts0 = document.querySelector(".dropdown-lst .dd-item:first-child > *:not([selected])")
        const DropdownOpts = document.querySelectorAll(".dropdown-lst .dd-item > *");
        const DropdownArrowBtn = document.querySelector(".Dropdown .dropdown-control-ctn");
        const DropdownOpenClose = (e) => {
            e.stopPropagation();
            if ((e.type==='click' && e.pointerId>0 )|| (e.key && !/ArrowDown|ArrowUp|Tab/.test(e.key))) {
                if (!/open/.test(Dropdown.classList.value)) {
                    Dropdown.classList.add('open')
                    DropdownBtn.setAttribute('aria-expanded', true)
                    document.getElementById('DropdownList').focus();
                } else {
                    DropdownBtn.removeAttribute('aria-expanded')
                    DropdownBtn.focus()
                    Dropdown.classList.remove('open')                    
                }
            }
            if (e.key && /ArrowDown|ArrowUp/.test(e.key)) {
                Dropdown.classList.add('open')
                let current = [...DropdownOpts].findIndex((e) => { return e.getAttribute('selected') })
                let move = /ArrowDown/.test(e.key) ? current+=1 : /ArrowUp/.test(e.key) ? current-=1 : current;
                if (move>DropdownOpts.length-1) {move = DropdownOpts.length-1}
                if (move<0) {move = 0}
                DropdownOpts.forEach(e => {e.removeAttribute('selected'); e.removeAttribute('aria-selected')});
                DropdownOpts[move].setAttribute('selected', true);
                DropdownOpts[move].setAttribute('aria-selected', true);
                const selectedItem = { value: DropdownOpts[move].getAttribute('value') || "", text: DropdownOpts[move].innerText };
                setSelection(selectedItem);
                setAriaLabel(label + ' ' + DropdownOpts[move].innerText)
                onDropdownSelectedItem(selectedItem);
            }
            if (/blur/.test(e.type)) {
                Dropdown.classList.remove('open');
            }
        }
        if(DroptdownOpts0) { DroptdownOpts0.setAttribute('selected', true); }
        DropdownArrowBtn.addEventListener('click', DropdownOpenClose);
        DropdownList.addEventListener('keyup', DropdownOpenClose, true);
        DropdownList.addEventListener('blur', DropdownOpenClose, true);
        DropdownBtn.addEventListener('keyup', DropdownOpenClose, true);
        DropdownOpts.forEach((i) => {
            i.addEventListener('click', ({target}) => {
                const selectedItem = { value: target.getAttribute('value') || "", text: target.innerText }
                setSelection(selectedItem)
                setAriaLabel(label + ' ' + target.innerText)
                DropdownOpts.forEach(e => {e.removeAttribute('selected'); e.removeAttribute('aria-selected')});
                target.setAttribute('selected',true)
                target.setAttribute('aria-selected',true)
                Dropdown.classList.remove('open')
                onDropdownSelectedItem(selectedItem)
                DropdownBtn.removeAttribute('aria-expanded')
                DropdownBtn.focus()
            })
        })

        return true;
    }
    return (
        <div className="Dropdown" id="DropdownComponent" ref={wrapperRef}>
            <div className="dropdown-control-ctn">
                <input type='hidden' id='dropdown-input' aria-label={ariaLabel} />
                <button
                    ref={ref}
                    name={name}
                    id='DropdownBtn' type='button'
                    className={'dropdown-selector-btn ' + (!selection.value && error==='true' ? 'invalid' : '')}
                    aria-haspopup='listbox'
                    aria-labelledby='dropdown-input'
                    >
                    {selection.text}
                </button>
            </div>
            <div className="dropdown-lst-ctn">
                <ul className="dropdown-lst" id='DropdownList' role="listbox" tabIndex='-1' aria-labelledby='dropdown-input' aria-activedescendant=''>
                    {children && children.length > 0 &&
                        children.map((child, index) => {
                            return <li key={'key-'+index} id={'dropdown-item-'+index} className={'dd-item dd-item-'+index}>{child}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
})
export default Dropdown;

