# PrimeLayer Trades weekly content playbook

This is the full procedure for the Saturday scheduled task. A session with no memory of earlier work should be able to follow it start to finish. Read all of it before doing anything.

## The job

Every Saturday, write, design, render and schedule the next Monday to Sunday of social posts for PrimeLayer Trades across three channels. The purpose of every post is to grow the waitlist and, later, fill the founders circle. Nobody reviews the posts before they publish, so the rules below are strict.

PrimeLayer Trades is software that runs a trading strategy the user picks or builds, around the clock, on their own Coinbase or Alpaca account. It is a subscription. Tagline: "Tested strategies, automated around the clock."

## Hard rules (a post that breaks one does not ship)

1. No dashes used as punctuation anywhere. No em dashes, no en dashes, no hyphens joining clauses. Rewrite the sentence. Ticker pairs such as BTCUSD are written without a hyphen.
2. Never invent a number. Every figure is either in the hook bank below or computed this session from real candles with code, and the code and raw result are saved in the week log.
3. Never promise or imply future returns. Describe what happened, in the past tense. Never say a pattern will repeat.
4. Sell the software, not money. No income claims, no "passive income", no "beat the market", no "guaranteed", no "risk free", no "moon", no hype.
5. Every backtest figure carries the label BACKTEST on the image and the words "Hypothetical backtest. Not live results." on the image and in the caption.
6. Winners are never shown alone. A post with a winning strategy also states a loss, a drawdown or the losing strategies.
7. Every number is labeled with what it is, the symbol, the timeframe and the date range.
8. No giveaways, no prizes, no cash incentives.
9. Never mention raising money, investors, equity or returns to backers.
10. Never state a price, a deposit amount, a discount or a seat count unless it is in `config.json`.
11. Only tease a feature that is listed in `config.json` under `features_in_build`. At most one teaser post in any six posts per channel.
12. No live trade results unless `config.json` has `live_trade_receipts` set to true.
13. No emoji. No hashtags on LinkedIn beyond two. No more than one on X.
14. Do not trade, move funds, change any database, send any email or touch any account other than Buffer and the assets repo.
15. Everything is branded as the company. Write as "we" or "PrimeLayer Trades" on every channel, including the personal LinkedIn profile. Never write "I", "me" or "my". Never name, sign off as, quote or describe any individual person, founder or employee. No personal stories.
16. Every caption on every channel includes the tagline "Tested strategies, automated around the clock." on its own line, near the end, above any disclaimer line. Never use the retired tagline "Your strategy never sleeps. You should." On X, count the tagline toward the 280 characters.
17. If a rule cannot be met for a post, drop that post and say so in the report. A thin week is better than a wrong post.

## Step 1: set up

1. Attach and clone the repo `atobin07/primelayer-trades-assets` with push access (use the add repo tool, then run the clone command it returns). Work on `main`.
2. `cd tools && npm install`.
3. Read `config.json`, this file, and every file in `weeks/` (the log of what has already been posted, so nothing repeats within six weeks).
4. If a Projects tool is available, also read `content/waitlist-campaign.md` and `brand/email-compliance-rules.md` for anything newer than this file. If they conflict with this file, the stricter rule wins.
5. Work out the target week: the Monday to Sunday that starts two days after the Saturday the task runs. Use the America/New_York calendar.
6. Call Buffer `get_account` and `list_posts` for the target week. If a channel already has a post on a day, leave that slot alone. Never create a duplicate.

If Buffer tools are missing or fail, stop, schedule nothing, and report it.

## Step 2: channels and slots

Buffer organization id `69e8ce8837e5d3634ae36ba8`.

| Channel | Buffer channel id | Days | Voice |
|---|---|---|---|
| X @tradeprimelayer | `6acbed5b778b240e2fdc1cef` | Every day | Brand. One idea, one number. 280 characters at most, counted with code. |
| LinkedIn profile (personal account, company voice) | `69e8cf77031bfa423c2f30ce` | Mon, Wed, Fri | Company voice, "we". 80 to 180 words. What we tested, what surprised us, what we changed. |
| LinkedIn page, PrimeLayer Trades | `6acbe4c1778b240e2fdbbab5` | Tue, Thu | Product and method. 60 to 150 words. |

Times: 8:30 am Eastern on weekdays, 10:00 am Eastern on Saturday and Sunday. Build `dueAt` with the correct America/New_York offset for that date (it changes when daylight saving ends).

That is 12 posts a week: 7 on X, 3 on the profile, 2 on the page.

## Step 3: the mix

Across the 12 posts aim for:

* 4 market data posts. A fresh, checkable fact about how a market actually moved.
* 4 strategy test posts. What a tested strategy did, wins and losses together.
* 2 method posts. How we test, what we got wrong, why we cut a number.
* 2 product posts. What the software does and who it is for, tied to the week's data.

Every week needs at least two market data posts built from numbers computed this session, so the feed stays current. The same fact may run on X and LinkedIn in the same week, rewritten for each, on different days.

Good post shapes: a question one day and the answer the next, a single large number, a scorecard, a "we were wrong" correction, a two column comparison.

## Step 4: fresh market data

Use whichever of these is available, in this order: TradingView OHLCV tool, CoinGecko, CoinMarketCap, Coinbase product candles (read only), web search of a primary source. Pull daily candles, save them to a file, and compute with code. Do not estimate in prose.

Symbols to favor: AMEX:SPY, NASDAQ:QQQ, COINBASE:BTCUSD, COINBASE:ETHUSD, COINBASE:SOLUSD.

Ideas that suit the product (it runs while the user is away, it follows rules, it does not get tired):

* Share of an index's gain that came overnight against the regular session, for the year or the latest month.
* Result of holding with and without the best and worst N days.
* How many days moved more than 2 percent, and how many were on weekends for crypto.
* Largest fall from a high, and how long the recovery took.
* What happened the week just ended: biggest day, range, weekend move.

Check each figure twice with two separate calculations before using it. Write the symbol, timeframe, date range and method into the week log.

## Step 5: hook bank (verified, reusable, do not alter the figures)

Market, 1 Jan to 8 Oct 2026, daily candles:

* AMEX:SPY, price only: up 13.49 percent (681.92 to 773.93). 73 percent of the points gained came between the close and the next open. Compounded, overnight 9.51 percent, regular session 3.64 percent. The regular session was open about 19 percent of all hours.
* COINBASE:BTCUSD: down 6.6 percent for the year to date. Without the 10 best days, down 51.4 percent. Without the 10 worst days, up 69.2 percent.
* Bitcoin's worst day of the year was 5 Feb, down 13.98 percent. Its best day was 6 Feb, up 12.33 percent.
* 19, 20 and 21 Aug: up 7.14, 5.36 and 7.28 percent. Up 21.1 percent in three days.
* 76 of 281 days moved 2 percent or more. 35 up, 41 down. Highest close 96,955.16 on 14 Jan, lowest close after that 58,523.93 on 30 Jun, a 39.6 percent fall.

Strategy tests. Hypothetical walk forward backtest, 2022 to 2026, 25 liquid coins, equal weight, daily candles, 10 bps fee plus 5 bps slippage per fill. As of 9 Oct 2026. Not live results.

* 22 strategies tested. 12 made money. 10 lost.
* 6 of 22 won at least half their trades. 5 of those 6 lost money, average return down 23.6 percent.
* 16 won less than half their trades. 11 of those made money, average return up 8.1 percent.
* Best: Confirmed Bollinger Breakout, up 38.3 percent in total, about 7 percent a year, max drawdown 16.9 percent, won 32 percent of its 779 trades. Its close variant Bollinger Band Breakout was up 38 percent with the same drawdown and win rate.
* Worst: Stochastic Reversal, down 48.1 percent, max drawdown 58.4 percent, won 55 percent of its trades.
* 8 dip buying strategies tested. 7 lost money. Average return down 23.7 percent, average max drawdown 38.8 percent. The one that made money took 5 trades in the whole period.
* 9 trend strategies. 7 made money. Average return up 7.5 percent.
* Chandelier Trend by year on 25 coins: 2022 down 9 percent, 2023 up 6.8 percent, 2024 up 16.1 percent, 2025 down 10.3 percent, 2026 up 8.6 percent.
* Narrower test, 4 coins, 2024 to 2026, state that scope: on SOL a plain SMA crossover lost 64 percent. The same market with a Chandelier trailing stop returned 27 percent.
* The first headline for Chandelier Trend was up 35.7 percent on 4 coins. On 25 coins over five years it was up 13.9 percent. We replaced the headline with the lower number.

Do not rerun or extend the strategy tests. Do not add strategy figures that are not listed here.

## Step 6: call to action

Read `config.json`.

* `waitlist_url` is null: end no more than half the posts with "Follow to see the full results." or "The waitlist opens soon. Follow so you see it first." No links.
* `waitlist_url` is set: about two posts in three end with one plain line and the link, for example "The full results for all 22 strategies go to the waitlist first." followed by the link. On X the link counts toward the 280 characters. The rest end with no ask at all.
* `founders_url` is set: at most two posts a week mention the founders circle, using only the facts in `config.json` under `founders`. Until then, at most one post a week may say that founder seats will be offered to the waitlist first, with no price, no seat count and no deposit.

Never use urgency that is not true. No countdowns, no "last chance", no "spots filling fast" unless `config.json` gives a real count.

## Step 7: images

Every post gets one image, 1080 by 1350. Reuse one image across channels when the fact is the same.

1. Copy the closest file from `templates/` into `pages/` as `<monday date>-<day>-<short name>.dc.html`, for example `pages/2026-10-19-mon-overnight.dc.html`. Edit the text only as far as needed. Keep the frame: lockup top left, mono label top right, one headline, supporting block, hairline and footer line.
2. Brand, exact values. Ground #0A1411, surface #0F1D18, hairline #1E332B, ink #F3EFE7, muted #93A39B, accent orange #FF8200, gain #7EE2A8, loss #FF5C7A. Fonts Sora (weights 200, 300, 400, 500) and Geist Mono (400, 500). Headlines are Sora weight 200.
3. One orange moment per image besides the logo: one phrase or one number. Orange never marks a loss. Losses use the loss color with the word "down" or a minus sign. Gains use the gain color.
4. No gradients, glows, shadows, italics, serif fonts, emoji, stock photos or generated pictures. Thin lines, lots of space.
5. Labels top right: MARKET DATA, BACKTEST, METHOD or PRODUCT.
6. Render: `node render.js pages/<file> [more files]`. It writes `../posts/<name>.png`. If it prints OVERFLOW, shorten the copy or reduce the type and render again.
7. Open every PNG with the Read tool and look at it. Check for clipped or overlapping text, wrong numbers, dashes, and more than one orange moment. Fix and render again until clean.

## Step 8: publish

1. Write the week log `weeks/<monday date>.md`: a table of date, channel, category, caption, image name, plus the source and calculation for every number, plus anything dropped and why.
2. Commit `posts/`, `tools/pages/` and `tools/weeks/` and push to `main`. Never commit anything other than marketing images, page sources and logs. No secrets, no app code.
3. Wait 90 seconds for the site to deploy. Image addresses are `https://primelayer-trades-assets.vercel.app/posts/<name>.png`. The shell cannot open that address, which is expected. Buffer checks it when the post is created.
4. Create each post with Buffer `create_post`: `schedulingType: automatic`, `mode: customScheduled`, `dueAt` as set in step 2, `assets: [{image: {url, metadata: {altText}}}]`. Alt text states what the image says, numbers included. If Buffer rejects the image address, wait 60 seconds and try that post once more. If it still fails, skip it and report it. Do not post without the image.
5. Call `list_posts` for the target week and confirm the count and times match the log.

## Step 9: final check before you finish

Reread every caption and image against the hard rules, one rule at a time. Count X captions with code. Search every caption and page source for the characters "—" and "–" and for " - ". Delete from Buffer any post that fails.

## Step 10: report

Send a short message to the user:

* How many posts were scheduled per channel and for which dates.
* The fresh numbers used this week and where they came from.
* Anything skipped, and why.
* One reminder line: posts publish on their own, and any post can be removed in the Buffer queue before it goes out.

If a Projects tool is available, also save the week's table to the project as `content/week-of-<monday date>.md`.
