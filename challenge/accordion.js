let accordion = document.getElementById('accordion');
let accordionSection = document.getElementsByClassName('accordion-section');


accordion.addEventListener('click', (event)=>
{
   if(event.target.className == 'accordion-section')
   {
        let clickedDiv = event.target;

       setDefault(clickedDiv);
       openSection(clickedDiv);
    }  

});


function setDefault(clickedDiv)
{
    for(let i = 0; i < accordionSection.length; i++)
    {
        //checks if clicked element is the same as element being operated on
        if(accordionSection[i] == clickedDiv)
        {
            //jumps over one iteration in the loop
            continue;
        }
        else
        {
            //set default attribute values
            accordionSection[i].setAttribute('aria-expanded','false');
            let content = document.getElementById(accordionSection[i].getAttribute("aria-control"));
            content.setAttribute('aria-hidden', 'true');
        }
    }
}

function openSection(clickedDiv)
{
    let content = document.getElementById(clickedDiv.getAttribute("aria-control"));
    let arrow = clickedDiv.childNodes[3];

    if(clickedDiv.getAttribute("aria-expanded") === 'false')
    {
        clickedDiv.setAttribute('aria-expanded','true');
        content.setAttribute('aria-hidden', 'false');
        arrow.innerHTML= "arrow_drop_up"
    }
    else{
        clickedDiv.setAttribute('aria-expanded','false');
        content.setAttribute('aria-hidden', 'true');
        arrow.innerHTML= "arrow_drop_down";
    }  

}



