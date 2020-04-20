import * as React from 'react';
import { IGameArgs } from '../../components/App/Game/GameBoardWrapper';
import { GameLayout } from '../../components/App/Game/GameLayout';
import { IGameCtx } from 'boardgame.io/core';
import { IG } from './interfaces';

import { BHand } from './components/bhand'; 
import { BTrash } from './components/btrash'; 
import { BPiles } from './components/bpiles'; 
import { BToken } from './components/btoken';
import { BDeck } from './components/bdeck';
import { BButtons } from './components/bbuttons';

interface IBoardProps {
  G: IG;
  ctx: IGameCtx;
  moves: any;
  playerID: string;
  gameArgs?: IGameArgs;
}

let handStyle = {
  display: 'flex'
}

export class Board extends React.Component<IBoardProps,  {}> {
  render() {

    var me = this.props.playerID ? parseInt(this.props.playerID) : 1 // TODO : Local Fix - defaults to player 1
    var playerID = this.props.playerID ? this.props.playerID : "1" // TODO : Local Fix
    
    let hands = this.props.G.hands;
    let rotatedHands = hands.slice(me + 1, hands.length).concat(hands.slice(0, me + 1));

    return (
      <GameLayout
          gameArgs={this.props.gameArgs}
          >
          <div /* wrapper - not sure if this is necessary */
            style={{display: 'flex'}}>
            <div>
                { rotatedHands.map(hand => {
                      let index = hand.player;
                      return (
                        <div key={"Board" + index.toString()}
                             style={handStyle}>
                            {index === me ?
                              <><hr />Your Hand:</>
                            :
                              <BButtons onHintColor={(value: number) => {this.props.moves.moveHintColor(index, value)}}
                                        onHintValue={(value: number) => {this.props.moves.moveHintValue(index, value)}}
                                        myTurn={this.props.ctx.currentPlayer === playerID}
                                        keyPropagation={"Board" + index.toString()}
                                        > 
                              </BButtons>
                            }
                            <BHand hand={ hand } 
                                   me={me === index} 
                                   onPlay={(id: number) => {this.props.moves.movePlay(id)}}
                                   onTrash={(id: number) => {this.props.moves.moveDiscard(id)}}
                                   myTurn={this.props.ctx.currentPlayer === playerID}
                                   keyPropagation={"Board" + index.toString()}
                                   >
                            </BHand>
                        </div>
                        )
                })}
            </div>
            <div>
                {
                  this.props.G.trash.length === 0
                  ?
                  <BTrash card={ null } >
                    </BTrash>
                  :
                  <BTrash card={this.props.G.trash[this.props.G.trash.length - 1]} >
                    </BTrash>
                }
                <BToken treats={this.props.G.treats} countdown={this.props.G.countdown}></BToken>
                <BDeck cardsLeft={this.props.G.deckindex}></BDeck>
              </div>
            <div>
              <BPiles piles={this.props.G.piles}
                          keyPropagation={"Board"}
                          ></BPiles>
            </div>
          </div>

      </GameLayout>
    );
  }
}
        // <pre>{JSON.stringify(this.props.gameArgs, null, 2)}</pre>
        // <pre>{JSON.stringify(this.props.G, null, 2)}</pre>
        // <pre>{JSON.stringify(this.props.ctx, null, 2)}</pre>
        // <pre>{JSON.stringify(this.props.moves, null, 2)}</pre>
        // <pre>{JSON.stringify(this.props.playerID, null, 2)}</pre>


//        <table>
//          <thead>
//          <tr>
//            <th> Treats </th>
//            <th> Countdown </th>
//          </tr>
//          </thead>
//          <tbody>
//          <tr>
//            <th>{JSON.stringify(this.props.G.treats)}</th>
//            <th>{JSON.stringify(this.props.G.countdown)}</th>
//          </tr>
//          </tbody>
//        </table>
//        <table>
//          <thead>
//          <tr>
//            <th> Color 0 </th>
//            <th> Color 1 </th>
//            <th> Color 2 </th>
//            <th> Color 3 </th>
//            <th> Color 4 </th>
//          </tr>
//          </thead>
//          <tbody>
//          <tr>
//            <th> {JSON.stringify(this.props.G.piles[0])}</th>
//            <th> {JSON.stringify(this.props.G.piles[1])}</th>
//            <th> {JSON.stringify(this.props.G.piles[2])}</th>
//            <th> {JSON.stringify(this.props.G.piles[3])}</th>
//            <th> {JSON.stringify(this.props.G.piles[4])}</th>
//          </tr> 
//          </tbody>
//        </table>
//        <table>
//          <thead>
//          <tr>
//            <th> Player ID</th>
//            <th> Cards </th>
//            <th> Hints </th>
//          </tr>
//          </thead>
//          <tbody>
//          <tr>
//            <th> 0 </th>
//            <th> {JSON.stringify(this.props.G.hands[0].cards)}</th>
//            <th> {JSON.stringify(this.props.G.hands[0].hints)}</th>
//          </tr> 
//          <tr>
//            <th> 1 </th>
//            <th> {JSON.stringify(this.props.G.hands[1].cards)}</th>
//            <th> {JSON.stringify(this.props.G.hands[1].hints)}</th>
//          </tr> 
//          </tbody>
//        </table>
//        <table>
//          <thead>
//          <tr>
//            <th> Trash </th>
//          </tr>
//          </thead>
//          <tbody>
//          <tr>
//            <th> {JSON.stringify(this.props.G.trash)}</th>
//          </tr> 
//          </tbody>
//        </table>
//
//        <pre>{JSON.stringify(this.props.ctx, null, 2)}</pre>
 