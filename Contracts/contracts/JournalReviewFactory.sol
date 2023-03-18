// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./JournalReview.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

error NoEtherSent();

contract JournalReviewFactory {
    address public immutable journalReviewTemplate;
    address[] public journalReviews;
    uint256 public journalReviewCount;

    event JournalReviewCreated(address indexed journalReview);

    constructor() {
        journalReviewTemplate = address(new JournalReview());
    }

    function createJournalReview() public payable returns (address) {
        if (msg.value <= 0) revert NoEtherSent();

        address clone = Clones.clone(journalReviewTemplate);

        JournalReview(clone).initialize{value: msg.value}(msg.sender);

        journalReviews.push(clone);
        journalReviewCount++;
        emit JournalReviewCreated(clone);

        return clone;
    }
}
