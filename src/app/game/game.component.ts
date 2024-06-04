import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
    selector: 'app-game',
    standalone: true,
    imports: [
        CommonModule,
        PlayerComponent,
        GameInfoComponent,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss'
})
export class GameComponent {
    pickCardAnimation = false;
    currentCard: string = '';
    game: Game;
    animal: string = '';
    name: string = '';

    constructor(public dialog: MatDialog) {
        this.game = new Game();
    }

    takeCard() {
        let card = this.game.stack.pop();

        if (!this.pickCardAnimation && card != undefined) {

            this.currentCard = card;
            this.pickCardAnimation = true;

            this.game.currentPlayer++;
            this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

            setTimeout(() => {
                this.game.playedCards.push(this.currentCard);
                this.pickCardAnimation = false;
            }, 1000)

        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogAddPlayerComponent, {

        });
    
        dialogRef.afterClosed().subscribe(name => {
            if (name && name.length > 0) {
                this.game.players.push(name);
            }
        });
      }

}