---
layout: page
title: Greedy Devils
date: 2017-06-03 10:50
categories: []
background_image_url: /assets/1024px-Tasmanian_Devil_roadsign.jpg
permalink:  /:collection/greedy-devils/
---
Greedy Devils started as an [entry to the 2017 200WordRPG challenge](/fragments/2017-04-22-greedy-devils.html). Hurriedly squeezing it into 200 words (plus never having actually played it outside of my own head) meant that many nuances needed (a) discovering, and (b) ironing out. After some play-testing, the rules have improved, and it does seem like there is a fun+interesting game in there. Meanwhile, we'll keep tinkering.

Any feedback? [Leave a comment](https://github.com/upthebuzzard/upthebuzzard.github.io/issues/11).

# The Rules (version 1.1, 2017-06-03)

## Setting the scene

You are greedy [(Tasmanian)](https://en.wikipedia.org/wiki/Tasmanian_devil) devils on an ever-shifting rubbish heap, scrabbling around for food, and fighting for survival. Everything you carry in your pouch leaches into you, changing your capabilities. Pick wisely.

The first with a pouch full of food, standing higher than all the other devils on the heap, wins.

<p/>{:.porthole}

_Warning: the Tasmanian Devil metaphor is somewhat overstretched here._

## You will need

* a standard deck of playing cards
* at least 2 players
   * _we are testing with 3 and 4 players e'en now_
* a unique token for each player
   * small enough so that a few can fit on a single playing card
   * e.g. chess or monopoly pieces
* enough space
   * in the middle, to lay out a 5x5 grid of cards
   * in front of each player, to display up to 6 cards

## Prepare the heap

Shuffle 52 playing cards, and deal them face down as 25 mini piles arranged in a 5x5 grid. Doesn't matter if the piles have different numbers of cards. Turn over the top card of each pile to be face up and, later, any time the top card is taken from a pile, ensure the revealed card is face up.

The value of the top card in each of 5x5 piles represents the height above bedrock of the heap at that location. Aces are low, Kings are high (literally).

You start next to the heap, and can move alongside or onto the heap.

## Your pouch

As you scramble across the heap, you can pick up cards to put in your pouch. It can hold a maximum of 5 cards, and you must immediately DISCARD any duplicate values or excess cards.

Your pouch cards are laid out in front you, face up, visible to all the other players at all times, except when you are fighting.

Each card in your pouch can be considered as food (if smaller than 6, ie. Ace,1,2,3,4,5), or a weapon to be used in a fight (bigger is better). Furthermore, they 'leach' into you, affecting your capabilities.

If you have any
* Spades => you can PICK two cards (rather than one),
* Diamonds => you can MOVE up a height difference of 5 (rather than 4),
* Clubs => each card (of any suit) you play in a fight scores +1,
* Hearts => if you play it in a fight, and there is a tie, the highest heart acts as a tie-breaker.

## Actions

In each round, each player in turn chooses one of the following actions

### MOVE

Moves are one step NESW to a neighbouring spot on the 5x5 grid, staying on or beside the heap.

You can
* step along to a card of the same value
* step uphill, from a lower card to a higher-value card, if the difference is <= 4 (or <= 5 if you hold a diamond)
* slide downhill all the way in one glorious swoosh (as far as you choose), as long as you follow a sequence of ever lower cards
* stay where you are

### PICK

You can pick
* the card you're standing on (and so reveal the one underneath that),
* or a card from below a higher neighbouring point (as if you're digging into the side of a hill).

### DISCARD

You can choose to just discard a card from your existing pouch, or maybe you have to make room for a newly picked card.

The card is discarded as far away as a MOVE, i.e. to a neighbouring position, or can slide all the way down. When it comes to rest, it is the new top card.

You can only discard onto your own position if it doesn't raise your height by more than 4.

## FIGHT

Any time two or more devils are on the same location, however fleetingly, any of them can immediately initiate a fight.

Each devil in turn has a chance to initiate a fight with one other devil. This might mean choosing to fight again with the devil who started the previous fight.

For each fight between two devils, each gathers up their pouch and secretly selects a card to be a weapon. The weapons are revealed simultaneously. The two card values are compared, factoring in any 'leaching' effects, and the higher score wins. Both cards are immediately discarded. The pouches are revealed again, and the winner (if there is one) chooses a card from the loser's pouch.

## Taking turns

In each round, each player takes their turn to choose one action (with a caveat that a fight could break out at any time). And when deciding of there is to be a fight, the players are consulted in the same order as for choosing actions.

For 2 players, alternate who goes first in each round.

For 3 or more players, rotate clockwise around the group who goes first in each round. Within each round, rotate clockwise around the group for the remainder of that round. Once every player has started a round, continue to rotate clockwise around the group for who goes first, but rotate anti-clockwise around the group for the remainder of that round. Etc.

Or make up your own fair solution for mixing up the order in which everyone gets to make their choices.

-- End of the rules --

<br><br>

Any feedback? [Leave a comment](https://github.com/upthebuzzard/upthebuzzard.github.io/issues/11).


# Edge Cases, Worries, Weaknesses, Maybes

* So far, the rules have mostly been tuned for 2 players. We anticipate there will be a need to adjust some details for more players to keep things balanced.
* Perhaps the heap could be built from 2 or more decks of cards?
* No reason why the heap can't expand out beyond the 5x5 grid with discards.
* Maybe there is a better metaphor than Tasmanian Devils?

# Major changes

* 1.0 The initial version [as submitted to the 2017 200WordRPG challenge](/fragments/2017-04-22-greedy-devils.html)
* 1.1
   * 'leaching'
      * effects are clarified to be regardless of the number of each suit in the pouch
      * hearts now is a tie-breaker in fights, rather than an enlarged pouch
      * diamonds now allow climbing higher, rather than moving twice
   * fighting
      * can now happen any time 2 or more devils occupy the same location, rather than being an explicit action
      * sequencing is clarified
   * discarding onto your current location has been clarified, so cannot raise yourself up too high.
   * Staying on a local peak is now ok
   * sequencing has been clarified. No more coins. There is a specified turn order within each round.
