let accordion = document.getElementById('accordion');
let accordionSection = document.getElementsByClassName('accordion-section');

accordion.addEventListener('click', accordionListener);

function accordionListener(event)
{
    if(event.target.className == 'accordion-section')
   {
       let clickedBtn = event.target;

       setDefault(clickedBtn);
       openSection(clickedBtn);
   }  
}

function setDefault(clickedBtn)
{
    for(let i = 0; i < accordionSection.length; i++)
    {
        //checks if clicked element is the same as element being operated on
        if(accordionSection[i] == clickedBtn)
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

function openSection(clickedBtn)
{
    let content = document.getElementById(clickedBtn.getAttribute("aria-control"));
    let arrow = clickedBtn.childNodes[3];

    if(clickedBtn.getAttribute("aria-expanded") === 'false')
    {
        //set open state attribute values
        clickedBtn.setAttribute('aria-expanded','true');
        content.setAttribute('aria-hidden', 'false');
        arrow.innerHTML= "arrow_drop_up"
    }
    else{
        //set default attribute values
        clickedBtn.setAttribute('aria-expanded','false');
        content.setAttribute('aria-hidden', 'true');
        arrow.innerHTML= "arrow_drop_down";
    } 
}