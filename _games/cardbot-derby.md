---
layout: page
title: Cardbot Derby
date: 2017-12-26 22:20
categories: []
permalink:  /:collection/cardbot-derby/
excerpt: >
  use a standard deck of playing cards to enter a world of more or less out of control cardbots
background_image_url: /assets/img/cardbot/cardbot_robot_perspective_w800.JPG
credits:
  - "[Background image](/assets/img/cardbot/cardbot_robot_perspective_w800.JPG) by [me](/about)"
---

Cardbot Derby is the latest in an ongoing challenge to create interesting, non-trivial games using one or more standard decks of playing cards. The main idea was borrowed from [RoboRally](http://avalonhill.wizards.com/games/robo-rally) (a rather splendid fracas of a game), and then twisted to fit the affordances of the cards. Currently it is very much under construction, but first impressions hint that there is enough potential to warrant further iterations.

Any feedback? Leave a comment [via a github issue](https://github.com/upthebuzzard/upthebuzzard.github.io/issues/28).

![robots facing off](/assets/img/cardbot/cardbot_robot_closeup_w800.JPG)

# The Rules (version 0.3, 2017-12-29)
{:.no_toc}

* placeholder
{:toc}

# Setting the scene

You are controlling your robot, across a dangerous and complex tubular surface, with sets of commands. You have a series of locations to reach. Other robots are out there too, and they *will* interfere. The first robot to reach all the locations, in the correct order, is the winner.

# You will need

* two standard decks of playing cards
* at least 2 players (also works with 3, and 4, and almost certainly more - the more the better)
* a unique token to mark each robot's position and direction on the heap
   * NB, it needs to be obvious and unambiguous in which direction the robot is pointing
* enough space
   * in the middle, to lay out a 7x7 grid of cards
   * in front of each player, to display a few cards.

# Prepare the surface

Start with the first deck of 52 cards:

* Lay out 49 of the cards, face up, in a 7x7 grid
* Swap around the cards so that the various features are in the suggested positions
   * the target cards (red King, Queen, Jack)
   * the conveyer belt (black Ace, and 3 black number cards)
   * (see the Advanced Rules for more possible features)
* Turn all the non-feature cards face down.
* _See the picture for a suggested arrangement of Aces and K,Q,J, as well as some of the 'advanced' suggestions._

![the surface](/assets/img/cardbot/cardbot_surface_h800.JPG)

With the second deck of cards:

* Sort the cards into suits: Hearts, Clubs, Diamonds, Spades.
* Each player gets one suit of 13 cards, shuffled, and placed face down in front of them (they are not to be subsequently shuffled or reviewed by the player, unless they reach a target location).
* The players place their robots on the appropriate starting positions, roughly equidistant from the Jack, which is the first target they are all trying to reach (then the Queen, then the King).
* _See the picture for the suggested starting positions._

![starting positions](/assets/img/cardbot/cardbot_starting_positions_w800.JPG)

# Order of Play

## 1. Choose

At the start of each round, each player decides on their sequence of commands which will be used to control their robot
* Pick the next 5 cards from the top of their (face down) pile.
* Review the 5 cards.
* Sort the 5 cards into a suitable sequence.
* Hand these 5 command cards in a pile, face down, 1st command on top, to the next player along.

Timing is of the essence. Once one player has set up their command card sequence, *all* other players have 30 seconds to do the same, otherwise their 5 cards are handed on as-is.

## 2. Enact

Each player enacts their neighbour's commands with their neighbour's robot.

For the first command, in sync across all the players:
* Reveal the top (face down) command card.
* Act out the revealed commands in order of highest card first (Aces highest, then King, Q, J, 10, 9, ...2)
   * If two or more command cards have the same value, use the previous (if any) or next cards in the sequences as a tie-breaker (only really matters during multiple collisions).
* MOVE or TURN the relevant robots appropriately, taking care to work out the consequences of
   * COLLISIONs
   * CONVEYER BELTs

Repeat for the next 4 commands.

### MOVE

If the command card being played is one of Ace, King, Queen, Jack, Ten,
* move the robot forward by 1 place
   * unless there is a COLLISION

The surface on which the robots move can be considered as tubular. The left and right sides of the grid wrap around and meet. If you go forward off the right hand side of the grid, you move onto the corresponding location on the left hand side, and vice versa.

The top and bottom of the grid do not wrap.

#### COLLISION

At most one robot can ever be on a given location.

If a robot attempts to enter an occupied location
* the mover wins and shoves the occupant along to the neighbouring location
   * unless that neighbouring location is also occupied, or would push the occupant off the end of the grid, in which case the shoved robot pings out sideways, in a direction of the mover's choosing
   * unless there is no available location for the shoved robot to be pinged into, in which case the attempted move fails and neither the shoved nor shover moves.

### TURN

If the command card being played is one of 2-9, turn the robot that many times 90' clockwise.

For example, if the card is a
* 2, turn the robot 2x90', i.e., to face in the opposite direction
* 3, turn the robot 3x90', i.e., to face left
* 4, the robot spins in place and ends up facing the same direction
* 5, turn the robot 5x90', i.e. to face right
* etc

### CONVEYER BELT

Once the current command card has been acted upon, for all robots, if a robot is sitting on a CONVEYER BELT (i.e., a line of black cards starting with an Ace) it is moved one position along the belt (away from the Ace).

If the robot is already on the last belt position, it is moved onto the next location along from the belt (according to the same rules as a standard MOVE, in the case that location is already occupied).    

## 3. Reset

Once all 5 commands have been acted out:
* Return the cards to each player, to be placed face down, underneath their pile (NB, no shuffling, or reviewing the pile)
* If, during that round, a player's robot was (however fleetingly) on their next target location (in order, a red Jack, Queen, King),
   * remove the matching card from that player's pile
   * place it face up under the target location (so everyone can see which robots have reached that target)
   * shuffle the player's remaining pile, ensuring it remains face down

### Win ?

If, by the end of the round, one or more player has reached all 3 targets, in order (i.e. a red Jack, Queen, King), they have won.

### Repeat

Back to step 1 for the next round.

-- End of the rules --

<p/>{:.porthole}

Any feedback? [Leave a comment](https://github.com/upthebuzzard/upthebuzzard.github.io/issues/28).

# Appendix

## Advanced Rules

### More Robots

This game is 'better' (meaning, more anarchic) the more robots are floundering around in play, so here are some suggestions to increase the robot count

* To have more than 4 players, simply use a 3rd deck of cards to supply sets of command cards, of the same suit, for each extra player
* For 3 players, run a 4th robot as a random player. Just shuffle their command cards and play them as-is.
* For 2 players, run 2 robots each.
   * The winner is now the 1st to get any one of their robots to the final target.

### More Obstacles

Once you have the idea of the one conveyer belt working ok, let your imaginations run riot.

Treat the black cards as special features on the grid, and the red court cards as targets.

* 2 conveyer belts !
   * Consider each black ace as the start of a conveyer belt, which could run either across or up/down.
   * Continue the line of the belt with face-up, black number cards.
   * You could run the belt across the full width of the grid, and any passengers would just keep on going round and round.
* Teleport
   * Use the pair of Jacks (J for jump).
   * Stopping on one Jack teleports the robot to the matching Jack.
   * If the robot remains on that Jack after the next command, it teleports back again.
   * And so on until it finally moves off one of the Jacks.
   * two robots can swap positions simultaneously via the teleport Jacks.
* Sticky
   * Use the (sticKy) Kings to mark locations where the robots cannot turn.
   * All they can do is move forward (or stay still).
* Slippery
   * Use the (ice) Queens to mark locations where robots keep moving in the same direction.
   * Similar to the conveyer belt.
   * You can never stay on a Queen.
* Or any other types of obstacles that occur to you...

## Edge Cases

* TBC

## Worries & Weaknesses

* 2-player mode easily turns into a boring procession, with the player in the lead zipping along, and the other floundering, and no collisions
   * more-player mode would work better, with more carnage
* it is easy to get a bad hand of 5 cards

## Maybes  

* The winning player has to end the round on the final target?
* Draw more than 5 cards, and select 5 from them

## Alternative Names

* Cardbot
* Cardbot Derby
* Steeplecard
* Robocard
* ...

## Major rule changes

* 0.3 (2017-12-29)
   * re-assigned cards to different features on the grid
* 0.2 (2017-12-27)
   * amended the turn mechanic from odd/even to card num x 90'
* 0.1 (2017-12-26)
   * the initial version
