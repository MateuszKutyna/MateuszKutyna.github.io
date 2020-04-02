class Cell{
    x;
    y;
    state;
    middle;
    constructor(_x,_y,_state){
        this.x=parseInt(_x);
        this.y=parseInt(_y);
        this.state=parseInt(_state);
        this.middle=new Array(2);
        this.middle[0]=this.x+(sclx/2);
        this.middle[1]=this.y+(scly/2);
    }

    get x(){
        return this.x;
    }

    get y(){
        return this.y;
    }

    get state(){
        return this.state;
    }

    get middle(){
        return this.middle;
    }

    set state(_value){
        this.state=_value;
    }
}