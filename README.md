# Dabble

"Don’t debate people in the media when you can debate them in the marketplace." - Naval Ravikant. 

A wordplay on dabbling into blogging + decentralized autonomous blogging platform. 

To use this platform, you would need:
* [Metamask](https://metamask.io/)
* Switch to Matic Network: 
 * Go to networks -> Custom RPC -> In RPC URL enter https://testnet2.matic.network
 * Matic test net tokens to interact with the platform. Get yours from here: https://docs.matic.network/matic-js-tutorial/#matic-faucet


## Detailed Report and PPT
* A Detailed Report of the Project can be found [here](https://docs.google.com/document/d/1ukHScm3EpLeF0-nc_YlXssSfiTJcQF_Hr5BtPG-qWQo/edit?usp=sharing)
* A Presentation on the Application can be found [here](https://docs.google.com/presentation/d/1ETsGNuQ0Fa6QZennJCoMNihGZpdcJhpNNgXOCsvEQo8/edit?usp=sharing)


## Ideation

Eli5: 
* Writes want to get smaller feedback loops around their ideas. 
* Readers want to support their creators work (+ earn some money on the side). 

Roles: 
* Writer incentivizes readers to read by putting in some token amount as skin in the game. 
* Readers jump on the opportunity on making some money on the side and give feedback based on their risk apepetite. 
* For feedback each chapter is a round where an author gives out the next possible storylines. Then the platform runs a prediction market on top of it. 


We wanted to combine the following powers:
* Of the benefits of blockchains: open, permisionless, censorship resistant. 
* Of the benefits of Matic: 
  * small micropayments and bulk transactions.
  * Multiple markets may resolve at the same time. 
* Of the power of decentralized writing communities like Wikipedia and combined with the ideas from game and market theory. 

## Market Validation
* China: 
   * The QQ Reading model from https://a16z.com/2018/12/07/when-advertising-isnt-enough-multimodal-business-models-product-strategy/
    * Paid books allow readers access of up to ⅔ of the book for free. Readers have time to get hooked before they need to pay to unlock the ending. 
    * Books are also sold as bite-sized snacks. Readers pay per 1,000 words, for often-serialized works. Below is a screenshot of one of the most popular books from 2014, 一世倾城. It has over 10,000 chapters and is still being updated — now more than 46 times the length of the entire Harry Potter series. Because authors can publish chapters piecemeal, they are also able to incorporate reader feedback to quickly change plots or even kill off characters.
   * Some authors offer free books and illustrations, gain a loyal user base, and then collect money through tips. At the end of each chapter, an overlay button for tipping authors allows readers to tip from $0.15 and up.
   * Valued at $1.1 billion with 850 million active users. 
* Similar startups in India: 
   * https://www.qwertythoughts.com/
 

See how well films like Dangal & Andhadhun have performed in the chinese market, Narcos performing in Indian market. 


How are we different from Augur: 
* Liquidity problem as Augur suffers from chicken and egg problem + behavorial changes around prediction markets. We take an already existing behavoir and improve on that. The tech problems Augur faces around scaling, high transaction costs get solved by using Matic Network. 
* Specialized for online content industry. 
* The game theory in all these prediction market platforms probably doesn't incentivize the underdog.


## Spec Sheet: 
Actors:
* Writer
* Reader


Incentives:
* Writer:
    * Wants feedback on their book.
    * Cheaper/Shorter feedback loops.
        * Compared to traditional publishing that takes 6 - 8 months per book.

* Reader:
    * Wants to support authors writing good content because itna bad context exists on the market.
    * Wants to earn money for giving feedback.
    * Reading is dying habit.


## States:
* State 0 - Process at every new chapter
    * Click on creating a new article.
        * Spec sheet Article:
            * Variable:
                * Name
                * Content
                * Amount staked - skin in the game.
                * Question for followup:
                    * Option is binary.
            * Hard constraint:
                * 48 hours of outcome.
* State 0 - 1: Article created
* State 1:
    * For 48 hours things that are happening:
        * Readers are reading.
        * Readers are voting on followup:
            * Stake:
                * Min
                    * Spam prevention
                * Max
                    * Whale prevention




## Game Theory

* Writer - by staking amount, they increase the possiblity of their article getting read.

* Chapter:
    * 5% reward is split for reading.
        * Bot prevention:
            * Captcha
    * 95% reward is split for incentive on feedback.
`

Example:

### Case 1: Voting is not tied

* Author stakes $100.
* Readers:
    *  Read: 10
    *  Vote: 5
        *  Metrics:
            *  3 - true
            *  2 - false
        *  Resolved: true wins.

* Final incentive disbursal:
    * Every reader get's: $5/10 = $0.5
    * Every reader who voted and won:
        * Winning pool comprises of:
            * 95% of author's stake = $95
            * Total stake of the voting pool
        * Disbursement to winners:
            * Based on their ~ in the winning stake.

### Case 2: Voting is tied

* Author stakes $100.
* Readers:
    *  Read: 10
    *  Vote: 5
        *  Metrics:
            *  2 - true
            *  2 - false
        *  Resolved: true wins.

* Final incentive disbursal:
    * Every reader get's: $5/10 = $0.5
    * Tie breaker:
        * Author votes.
    * Pool that won from author's vote:
        * Winning pool comprises of:
            * 95% of author's stake = $95
            * Total stake of the voting pool
        * Disbursement to winners:
            * Based on their ~ in the winning stake.



Game theory possible use cases:
* Writers with more stake get more feedback in general.
    * Though more feedback from reader's perspective dilutes their reading incentive:
        * More people read, more their reading incentives dilute.
            * And hence the incentive would be to vote.
        * More people vote, the odds become more volatile.

* Writers with less stake are automatically more desirable given the above game theory:
    * Less readers read, less their reading dilution.
    * And hence when readers enter voting, the odds become more even.



# Component and flow of Application

### For a new User
* connect metamask of user to the site
* allow user to create transactions on matic network
* Dashboard consists of a list of books being written on the platform
* New user is able to
    * Read other books
    * Write a new Book

### While writing a book
* User can write a chapter of a new Book or
* User can continue writing new chapters for an existing book
* Whenever a new chapter is uploaded, user puts some eth on stake for that chapter.
* For the chapter being uploaded, Author is allowed to create polls with binary answer
* All readers who read the chapter get 5% of the Author's stake amount


### About Polls by Author
* Readers are allowed to take part in poll by putting their a part of their stake.
* Voters who were in minority, would loose theior staked amount.
* Voters who secured majority, will recive rewards
    *  Rewardpool comprise of: All the staked amount by readers+ 95% of the Author's stake
    *  Every voter in winning pool gets rewards in proportions to their staked amount.

### While reading books:
* User selects a book, and a list of chapters of that book is displayed
* User selects a chapter, and chapter content is displayed.
* User can finish reading and not take part in polls.
* User can decide to participate in poll and put stake on any option.
* Upon finishing reading, user can submit a transaction to indicate that reading was completed.
* To paeticipate in poll, user can submit a transaction, indicating the vote and the stake.

### When Polling period ends for a chapter
* 5% of Author's stake is eligible to be claimed by all readers.
* All readers are eligible to claim their share from 5% of the Author's stake.
* All readers and voters are eligible to initiate disbursal of Poll rewards.




## Setting up Project

#### Prerequisites
* nodejs
* npm

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
The app is ready to be deployed!


## Long term focus: 

Product Side
* Somehow people get tokens for early book launches and then they partake in books sales that happen later. 
* Book forking: allow diversity in consensus. Books are opinionated in creative work. 

Tech Side: 
* Privacy on votes. 
* Time based resoluton of the market on chain. 
* IPFS integration for content
