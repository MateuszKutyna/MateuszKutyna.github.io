let col,row,sclx,scly,started,gol,value,reczna,st,click;

function setup(){
    createCanvas(800,800);
    started=false;
    reczna=false;
    click=0;
}

function draw(){
    
    if(started){
        for(let i=0;i<col;i++){
            for(let j=0;j<row;j++){
                //Grid
                stroke(0);
                fill(255);
                rect(gol.cells[i][j].x,gol.cells[i][j].y,sclx,scly);
            }
        }
            for(let i=0;i<col;i++){
                for(let j=0;j<row;j++){
                    if(gol.cells[i][j].state==1)
                        {
                            //Generations
                            fill(0)
                            rect(gol.cells[i][j].x,gol.cells[i][j].y,sclx,scly);
                        }   
                }
            }
        if(!reczna)
        {
            gol.generate();
        }
    }
   sleep(100);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function start(){
    if(!reczna)
    {
        started=false;
        col=document.getElementById("x-axis").value;
        row=document.getElementById("y-axis").value;
        st=document.getElementById("structure").value;
       
        sclx=width/col;
        scly=height/row;
        gol=new GoL(col,row,st);
    }
    if(click<2)
        click++;
    else{
        click=1;
    }
  
    if(st=="Reczna definicja")
    {
        reczna=true;
    }
    if(st=="Reczna definicja" && click==2)
    {
        reczna=false;
        started=false;
        click=0;

    }
    started?started=false:started=true;
    loop();
    
}
 


function mousePressed(){

    if(started||reczna){
        
        for(let i = 0;i<col;i++){
           for(let j=0;j<row;j++){
                let dis = dist(mouseX, mouseY, gol.cells[i][j].middle[0], gol.cells[i][j].middle[1]);
                if(dis<(sclx/2)){  
                     gol.cells[i][j].state?gol.cells[i][j].state=0:gol.cells[i][j].state=1;
                }
            }
        }            
    }

            
        
    
}