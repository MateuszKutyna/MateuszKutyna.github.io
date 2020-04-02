class GoL{
    cells;
    cols;
    rows;
    initialState;
    

    constructor(_cols,_rows,_initialState){
        this.cols=parseInt(_cols);
        this.rows=parseInt(_rows);
        this.initialState=_initialState;
        this.cells=this.fillGridWithCells(this.cols,this.rows);
       
        this.setInitialState();
        
    }

    fillGridWithCells(cols,rows){
        //Creating array of cells
        let arr=new Array(cols);
        let x1=0;
        let y1=0;

        for(let i = 0;i<cols;i++){
            arr[i]=new Array(rows);
        }
        for(let i =0;i<cols;i++){
            
            x1=i*sclx;
            for(let j=0;j<rows;j++){
                y1=j*scly;
                arr[i][j]=new Cell(x1,y1,0);
            }
        }
        
        return arr;
    }
    setInitialState(){
        //Setting figures
        let halfX=(this.cols/2)-1;
        let halfY=(this.rows/2)-1;
        if(this.initialState==="niezmienne"){
            this.cells[halfX][halfY].state=1;
            this.cells[halfX+1][halfY].state=1;
            this.cells[halfX-1][halfY+1].state=1;
            this.cells[halfX+2][halfY+1].state=1;
            this.cells[halfX][halfY+2].state=1;
            this.cells[halfX+1][halfY+2].state=1;
        }else if(this.initialState==="glider"){
            this.cells[halfX][halfY].state=1;
            this.cells[halfX+1][halfY].state=1;
            this.cells[halfX-1][halfY+1].state=1;
            this.cells[halfX][halfY+1].state=1;
            this.cells[halfX+1][halfY+2].state=1;


        }else if(this.initialState==="oscylator"){
            this.cells[halfX][halfY].state=1;
            this.cells[halfX][halfY+1].state=1;
            this.cells[halfX][halfY+2].state=1;
        
        }else if(this.initialState==="reczna definicja"){

        }
        else if (this.initialState==="losowy"){
            //random
            for(let i =0;i<this.cols;i++){
                for(let j=0;j<this.cols;j++){
                        if(Math.random()<0.2)
                            this.cells[i][j].state=1;
                }
            }
        }
    }
    generate(){
            
            let nextGeneration=this.fillGridWithCells(this.cols,this.rows);
            for(let i=0;i<this.cols;i++){
                for(let j=0;j<this.rows;j++){
                    if(this.countNeighbors(i,j)===3 && this.cells[i][j].state===0){
                            //Birth
                        nextGeneration[i][j].state=1;
                    }else if((this.countNeighbors(i,j)>3 || this.countNeighbors(i,j)<2) && this.cells[i][j].state===1){
                            //Death
                        nextGeneration[i][j].state=0;
                    }else{
                        nextGeneration[i][j].state=this.cells[i][j].state;
                    }
                }
            }
            this.cells=nextGeneration;
            
    }

    countNeighbors(x,y){
      let numberOfNeighbors=0;
      let leftTop=this.cells[(x+this.cols-1)%this.cols][(y+this.rows-1)%this.rows].state;
      let top=this.cells[(x+this.cols)%this.cols][(y+this.rows-1)%this.rows].state;
      let rightTop=this.cells[(x+this.cols+1)%this.cols][(y+this.rows-1)%this.rows].state;
      let left=this.cells[(x+this.cols-1)%this.cols][(y+this.rows)%this.rows].state;
      let right=this.cells[(x+this.cols+1)%this.cols][(y+this.rows)%this.rows].state;
      let leftBottom=this.cells[(x+this.cols-1)%this.cols][(y+this.rows+1)%this.rows].state;
      let bottom=this.cells[(x+this.cols)%this.cols][(y+this.rows+1)%this.rows].state;
      let rightBottom=this.cells[(x+this.cols+1)%this.cols][(y+this.rows+1)%this.rows].state;
      numberOfNeighbors=left+leftBottom+leftTop+right+rightBottom+rightTop+top+bottom;    
        return numberOfNeighbors;
        
    }
    get cells(){
        return this.cells;  
    }
    get initialState(){
        return this.initialState;
    }

}