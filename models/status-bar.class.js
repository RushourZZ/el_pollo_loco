import { ImageHub } from "../manager_classes/imageHub.js";
import { DrawableObject } from "./drawable-object.class.js";



export class StatusBar extends DrawableObject{

    percentage = 100;


    constructor() {
        super();
        this.loadImages(ImageHub.STATUSBARS.statusbar_player_health_orange)
        this.setPercentage(100);
        this.x = 60;
        this.y = 0;
        this.width = 200;
        this.height = 60;
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = ImageHub.STATUSBARS.statusbar_player_health_orange[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
        resolveImageIndex(){
            if(this.percentage >= 100) {
                return 5;
            } else if (this.percentage >= 80) {
                return 4;
            } else if (this.percentage >= 60) {
                return 3;
            } else if (this.percentage >= 40) {
                return 2;
            }
            else if (this.percentage >= 20) {
                return 1;
            }
            else {
                return 0;
            }
        }
    
}