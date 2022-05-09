import React from 'react'

function DropdownOptions({openDropdown, options, selectedOption,open, onOptionClicked, type, onPress, isSelected }) {
   
    return (
        <div onClick={openDropdown} className='modal__DimesionSelectionDropdown'>
                                         <div className='modal__DimesionSelectionDropdownWrapper' >
                                             <div className='modal__DimensionSelectionDropdownOptionWrapper'>
                                                 <div className='modal__DimensionSelectionDropdownOption' >
                                                     <div className='modal__DimensionSelectionDropdownOptionText'>
                                                   {!selectedOption ? <div>
                                                       {options[0]}
                                                   </div>:<div>
                                                       {selectedOption}
                                                   </div> }
                                                     </div>
                                                     <div  className='modal__DimensionSelectionDropdownOptionIcon'>
                                                         
                                                     </div>
                                                 </div>
                                                 
                                             </div>
                                             
                                         </div>
                                         <div className={open? 'modal__DimesionSelectionDropdownArrowOpen':'modal__DimesionSelectionDropdownArrow'}>
                                         <svg width="8px" height="5px" viewBox="0 0 8 5" style={{transform: 'rotate(0deg)', transition: 'all 0.25s ease 0s'}}><g fill="none" fill-rule="evenodd"><path d="M-4-6h16v16H-4z"></path><path d="M1 0a1.003 1.003 0 0 0-.71 1.71l3 3c.18.18.43.29.71.29.28 0 .53-.11.71-.29l3-3A1.003 1.003 0 0 0 7 0H1z" fill="#48636f"></path></g></svg>
                                             
                                         </div>
                                         <div className= {open?'modal__DimesionSelectBoxDropdownOpen': 'modal__DimesionSelectBoxDropdown'} >
                                             
                                             {options.map(item=>{
                                                 return(
                                                     <div className='model__DimesionSelectDropDownList'  style={{
                                      backgroundColor: isSelected ? "red" : "white", }} onClick={onOptionClicked(item)}>
                                                         
                                                         <div className='a'/>
                                                         <div className='b'>
                                                             <div className='ba'>
                                                                 <div className='bac'>
                                                                 {item}

                                                                     
                                                                 </div>
                                                                 
                                                             </div>
                                                             
                                                         </div>

                                                     </div>
                                                 )
                                             })}

                                         </div>



                                     </div>
    )
}

export default DropdownOptions
