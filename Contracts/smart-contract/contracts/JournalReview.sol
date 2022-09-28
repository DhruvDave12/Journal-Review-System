// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract JournalReview {
    address public owner; //the owner of the smart contract

    constructor() {
        owner = msg.sender;
    }

    struct user {
        uint256 rating; //the rating of a user
    }

    mapping(uint256 => user) Users; //mapping each user from their userid to set of properties

    //event to notify server/client for any changes happening with the rating
    event ratingUpdated(uint256 userid, uint256 rating);
}
