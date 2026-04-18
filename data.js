// ===== ALL LESSONS =====
const LESSONS = {
  decoder: {
    id: 'decoder',
    icon: '🔍',
    title: '5-Step Problem Decoder',
    description: 'Break any problem down before writing a single line of code.',
    time: '10 min',
    body: `
<h2>Why You Need This</h2>
<p>Most people read a problem and immediately start coding. That's why they get stuck. The 5-Step Decoder forces you to <strong>understand before you code</strong> — and it's exactly what Pinterest wants to see.</p>

<div class="callout callout-tip"><strong>Pinterest cares about your thinking process</strong> Use this framework out loud or in comments so interviewers can follow your reasoning.</div>

<h2>The 5 Steps</h2>
<p>Every time you see a problem, work through these steps in order:</p>
<ul>
  <li><strong>Step 1 — RESTATE:</strong> Say the problem back in your own simple words</li>
  <li><strong>Step 2 — INPUT:</strong> What are you being given? (array? string? number?)</li>
  <li><strong>Step 3 — OUTPUT:</strong> What do you need to return? (boolean? number? array?)</li>
  <li><strong>Step 4 — EDGE CASES:</strong> What if it's empty? What if there's only one item?</li>
  <li><strong>Step 5 — PATTERN:</strong> Which pattern fits? (Loop? HashMap? Two Pointers?)</li>
</ul>

<h2>Example: Decoding "Two Sum"</h2>
<p>The problem says: <em>"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."</em></p>

<p>Here's how you decode it:</p>
<div class="code-block"><span class="cmt">// Step 1 — RESTATE</span>
<span class="cmt">// "Find two numbers that add up to the target. Return their positions."</span>

<span class="cmt">// Step 2 — INPUT</span>
<span class="cmt">// An array of numbers (nums) AND a target number</span>

<span class="cmt">// Step 3 — OUTPUT</span>
<span class="cmt">// An array with two index positions, like [0, 3]</span>

<span class="cmt">// Step 4 — EDGE CASES</span>
<span class="cmt">// Problem guarantees exactly one solution — no edge cases needed</span>

<span class="cmt">// Step 5 — PATTERN</span>
<span class="cmt">// HashMap — I need to remember what I've seen as I loop</span></div>

<div class="callout callout-good"><strong>Key insight for Step 5</strong> Ask: "Do I need to remember things I've already seen?" → HashMap. "Do I need to shrink/expand a range?" → Sliding Window or Two Pointers.</div>

<h2>Tricky Wording to Watch For</h2>
<ul>
  <li><strong>"return true if..."</strong> → Output is a boolean</li>
  <li><strong>"return the indices"</strong> → Output is an array of positions (not values)</li>
  <li><strong>"at least twice"</strong> → You're looking for duplicates</li>
  <li><strong>"contiguous subarray"</strong> → Adjacent elements in a row (think Sliding Window)</li>
  <li><strong>"distinct" or "unique"</strong> → No repeats allowed</li>
  <li><strong>"in-place"</strong> → Modify the original array, don't create a new one</li>
</ul>

<h2>Practice Using This</h2>
<p>The quiz below gives you a problem statement. Your job is to identify the correct step answer. Do this drill until it feels automatic — it will save you in the exam.</p>
    `,
    quiz: [
      {
        q: 'A problem says: "Given a string, return true if it reads the same forwards and backwards." What is the OUTPUT type?',
        opts: ['A string', 'A boolean (true/false)', 'An array', 'A number'],
        correct: 1,
        explain: 'Any time a problem says "return true if..." the output is a boolean. True or false — that\'s it.'
      },
      {
        q: 'You read a problem and feel confused. According to the 5-Step Decoder, what should you do FIRST before writing any code?',
        opts: ['Start typing whatever comes to mind', 'Restate the problem in your own simple words', 'Think about Big-O complexity', 'Look for the pattern right away'],
        correct: 1,
        explain: 'Step 1 is always: restate. If you can\'t say it in your own words, you don\'t understand it yet. Never skip this.'
      },
      {
        q: 'A problem says: "Find two numbers in an array that add up to a target." Which pattern does Step 5 point to?',
        opts: ['Sliding Window', 'Two Pointers on a sorted array', 'HashMap', 'Simple loop with no extra storage'],
        correct: 2,
        explain: 'Finding a pair that sums to a target is the classic HashMap problem. Store numbers you\'ve seen — then check if (target - current) already exists in your map.'
      }
    ]
  },

  loops: {
    id: 'loops',
    icon: '🔄',
    title: 'Arrays & Loops',
    description: 'The foundation of every coding problem you\'ll see.',
    time: '12 min',
    body: `
<h2>What Is an Array?</h2>
<p>An array is a list of items stored in order. Each item has an <strong>index</strong> (its position), starting at 0.</p>
<div class="code-block"><span class="kw">const</span> nums = [<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>, <span class="num">40</span>];

nums[<span class="num">0</span>]  <span class="cmt">// → 10  (first item)</span>
nums[<span class="num">1</span>]  <span class="cmt">// → 20  (second item)</span>
nums[<span class="num">3</span>]  <span class="cmt">// → 40  (last item)</span>
nums.length  <span class="cmt">// → 4  (total count)</span></div>

<div class="callout callout-warn"><strong>Common mistake</strong> Arrays start at index 0, not 1. The last index is always arr.length - 1.</div>

<h2>The Basic For Loop</h2>
<p>A loop lets you visit every item in an array one by one:</p>
<div class="code-block"><span class="kw">const</span> nums = [<span class="num">3</span>, <span class="num">7</span>, <span class="num">2</span>, <span class="num">9</span>];

<span class="cmt">// Classic for loop — gives you the index (i)</span>
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; nums.length; i++) {
  console.log(nums[i]); <span class="cmt">// prints 3, 7, 2, 9</span>
}

<span class="cmt">// for...of loop — simpler, gives you the value directly</span>
<span class="kw">for</span> (<span class="kw">const</span> num <span class="kw">of</span> nums) {
  console.log(num); <span class="cmt">// prints 3, 7, 2, 9</span>
}</div>

<div class="callout callout-tip"><strong>Which loop to use?</strong> Use the classic for loop when you need the index (position). Use for...of when you only need the value.</div>

<h2>Finding Max / Min</h2>
<p>A very common pattern: track a running best as you loop.</p>
<div class="code-block"><span class="kw">function</span> <span class="fn">findMax</span>(nums) {
  <span class="kw">let</span> max = -Infinity; <span class="cmt">// start low so anything beats it</span>

  <span class="kw">for</span> (<span class="kw">const</span> num <span class="kw">of</span> nums) {
    <span class="kw">if</span> (num > max) {
      max = num; <span class="cmt">// found a new best!</span>
    }
  }

  <span class="kw">return</span> max;
}

<span class="fn">findMax</span>([<span class="num">3</span>, <span class="num">7</span>, <span class="num">2</span>, <span class="num">9</span>]); <span class="cmt">// → 9</span></div>

<h2>Common Array Methods in JavaScript</h2>
<div class="code-block">arr.length          <span class="cmt">// number of elements</span>
arr.push(x)         <span class="cmt">// add x to the end</span>
arr.pop()           <span class="cmt">// remove & return last element</span>
arr.includes(x)     <span class="cmt">// true if x is in the array</span>
arr.indexOf(x)      <span class="cmt">// position of x (-1 if not found)</span>
arr.slice(i, j)     <span class="cmt">// copy from index i up to (not including) j</span></div>

<h2>Pattern Template</h2>
<p>When a problem asks you to check every element or track a running value, reach for this:</p>
<div class="code-block"><span class="kw">function</span> <span class="fn">solve</span>(arr) {
  <span class="kw">let</span> result = <span class="num">0</span>; <span class="cmt">// or -Infinity, or false — depends on problem</span>

  <span class="kw">for</span> (<span class="kw">const</span> item <span class="kw">of</span> arr) {
    <span class="cmt">// do something with item</span>
    <span class="cmt">// update result if needed</span>
  }

  <span class="kw">return</span> result;
}</div>
    `,
    quiz: [
      {
        q: 'Given: const arr = ["a", "b", "c"]. What does arr[0] return?',
        opts: ['"b"', '"a"', '1', 'undefined'],
        correct: 1,
        explain: 'Arrays in JavaScript are zero-indexed. The first element is always at index 0, so arr[0] is "a".'
      },
      {
        q: 'You need to loop through an array AND track the index (position) of each element. Which loop should you use?',
        opts: ['for...of loop', 'Classic for loop with let i = 0', 'while loop only', 'Either works the same way'],
        correct: 1,
        explain: 'Use the classic for loop (for let i = 0; i < arr.length; i++) when you need the index. for...of only gives you the value.'
      },
      {
        q: 'You want to find the smallest number in an array. What should you initialize your "running minimum" variable to?',
        opts: ['0', '-1', 'Infinity', 'arr[0] or Infinity'],
        correct: 3,
        explain: 'Either arr[0] (first element) or Infinity works. Infinity ensures any real number will be smaller, so it gets replaced immediately. Both are valid choices.'
      }
    ]
  },

  hashmap: {
    id: 'hashmap',
    icon: '🗺️',
    title: 'HashMaps',
    description: 'The most powerful tool for easy & medium problems.',
    time: '15 min',
    body: `
<h2>What Is a HashMap?</h2>
<p>A HashMap is like a <strong>notepad</strong>. As you loop through an array, you write down things you've seen. Later, you can check your notepad instantly — instead of searching the whole array again.</p>
<p>In JavaScript, use <strong>Map</strong> (the modern, recommended way):</p>
<div class="code-block"><span class="kw">const</span> map = <span class="kw">new</span> <span class="fn">Map</span>();

map.<span class="fn">set</span>(<span class="str">"apple"</span>, <span class="num">3</span>);   <span class="cmt">// store: key → value</span>
map.<span class="fn">get</span>(<span class="str">"apple"</span>);     <span class="cmt">// → 3  (retrieve by key)</span>
map.<span class="fn">has</span>(<span class="str">"apple"</span>);     <span class="cmt">// → true  (does key exist?)</span>
map.<span class="fn">delete</span>(<span class="str">"apple"</span>); <span class="cmt">// remove a key</span>
map.size;             <span class="cmt">// → 0  (how many entries)</span></div>

<h2>Why Is It So Useful?</h2>
<p>Checking if something exists in an array takes O(n) time — you scan every element. Checking in a Map takes O(1) — instant lookup, no matter how big the map is.</p>

<div class="callout callout-good"><strong>The Big Idea</strong> Instead of searching the array again and again (slow), use a Map to remember what you've already seen (fast). One loop + a Map = O(n) instead of O(n²).</div>

<h2>Pattern 1: "Have I Seen This Before?"</h2>
<p>Use a <strong>Set</strong> (like a Map but only stores keys, no values) when you just need to know if something appeared:</p>
<div class="code-block"><span class="kw">const</span> seen = <span class="kw">new</span> <span class="fn">Set</span>();

<span class="kw">for</span> (<span class="kw">const</span> num <span class="kw">of</span> nums) {
  <span class="kw">if</span> (seen.<span class="fn">has</span>(num)) {
    <span class="kw">return</span> <span class="kw">true</span>; <span class="cmt">// duplicate found!</span>
  }
  seen.<span class="fn">add</span>(num); <span class="cmt">// mark as seen</span>
}
<span class="kw">return</span> <span class="kw">false</span>;</div>

<h2>Pattern 2: Frequency Counter</h2>
<p>Count how many times each item appears:</p>
<div class="code-block"><span class="kw">const</span> freq = <span class="kw">new</span> <span class="fn">Map</span>();

<span class="kw">for</span> (<span class="kw">const</span> char <span class="kw">of</span> str) {
  freq.<span class="fn">set</span>(char, (freq.<span class="fn">get</span>(char) || <span class="num">0</span>) + <span class="num">1</span>);
}
<span class="cmt">// If char exists: increment by 1</span>
<span class="cmt">// If char is new: start at 0 + 1 = 1</span></div>

<h2>Pattern 3: Store Value + Index</h2>
<p>Store a number AND its position so you can return indices later:</p>
<div class="code-block"><span class="kw">const</span> seen = <span class="kw">new</span> <span class="fn">Map</span>(); <span class="cmt">// number → its index</span>

<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; nums.length; i++) {
  <span class="kw">const</span> complement = target - nums[i];

  <span class="kw">if</span> (seen.<span class="fn">has</span>(complement)) {
    <span class="kw">return</span> [seen.<span class="fn">get</span>(complement), i];
  }

  seen.<span class="fn">set</span>(nums[i], i); <span class="cmt">// store: value → index</span>
}</div>

<div class="callout callout-tip"><strong>When to reach for a HashMap</strong> "find duplicates" · "count occurrences" · "find a pair that equals X" · "check if two strings use the same letters"</div>
    `,
    quiz: [
      {
        q: 'Why is looking up a value in a Map faster than searching an array?',
        opts: [
          'Maps automatically sort their data',
          'Map lookups are O(1) — instant — while searching an array is O(n)',
          'Maps use less memory',
          'Arrays can\'t store the same types as Maps'
        ],
        correct: 1,
        explain: 'A Map lookup is O(1) — constant time, regardless of size. Searching an array is O(n) — it has to check each element. This is why HashMaps make solutions faster.'
      },
      {
        q: 'You want to count how many times each letter appears in a string. Which HashMap pattern do you use?',
        opts: [
          '"Have I Seen This?" with a Set',
          'Frequency Counter with a Map',
          'Store Value + Index',
          'Two Pointers'
        ],
        correct: 1,
        explain: 'The Frequency Counter pattern increments a counter for each character: map.set(char, (map.get(char) || 0) + 1). Perfect for counting occurrences.'
      },
      {
        q: 'In JavaScript, how do you check if a key exists in a Map?',
        opts: ['map.includes(key)', 'map.find(key)', 'map.has(key)', 'key in map'],
        correct: 2,
        explain: 'map.has(key) returns true if the key exists, false if not. This is the correct Map method — .includes() is for arrays, not Maps.'
      }
    ]
  },

  twopointers: {
    id: 'twopointers',
    icon: '👆',
    title: 'Two Pointers',
    description: 'A simple technique to avoid nested loops on arrays.',
    time: '12 min',
    body: `
<h2>What Are Two Pointers?</h2>
<p>Instead of using one loop variable, you use <strong>two</strong> — typically one starting at the beginning of an array and one at the end. You move them toward each other based on conditions.</p>

<div class="callout callout-tip"><strong>When to use it</strong> The array is sorted · you need to find a pair · you're checking a palindrome · you need to compare elements from both ends.</div>

<h2>The Template</h2>
<div class="code-block"><span class="kw">let</span> left = <span class="num">0</span>;
<span class="kw">let</span> right = arr.length - <span class="num">1</span>;

<span class="kw">while</span> (left &lt; right) {
  <span class="cmt">// check arr[left] and arr[right]</span>

  <span class="kw">if</span> (condition to move left) {
    left++;
  } <span class="kw">else</span> {
    right--;
  }
}</div>

<h2>Example: Check if a String is a Palindrome</h2>
<p>A palindrome reads the same forwards and backwards ("racecar", "level").</p>
<div class="code-block"><span class="kw">function</span> <span class="fn">isPalindrome</span>(s) {
  <span class="kw">let</span> left = <span class="num">0</span>;
  <span class="kw">let</span> right = s.length - <span class="num">1</span>;

  <span class="kw">while</span> (left &lt; right) {
    <span class="kw">if</span> (s[left] !== s[right]) {
      <span class="kw">return</span> <span class="kw">false</span>; <span class="cmt">// mismatch found</span>
    }
    left++;  <span class="cmt">// move inward</span>
    right--;
  }

  <span class="kw">return</span> <span class="kw">true</span>; <span class="cmt">// all characters matched</span>
}

<span class="fn">isPalindrome</span>(<span class="str">"racecar"</span>); <span class="cmt">// → true</span>
<span class="fn">isPalindrome</span>(<span class="str">"hello"</span>);   <span class="cmt">// → false</span></div>

<h2>Example: Two Sum on a SORTED Array</h2>
<p>If the array is already sorted, Two Pointers works instead of a HashMap:</p>
<div class="code-block"><span class="kw">function</span> <span class="fn">twoSumSorted</span>(nums, target) {
  <span class="kw">let</span> left = <span class="num">0</span>;
  <span class="kw">let</span> right = nums.length - <span class="num">1</span>;

  <span class="kw">while</span> (left &lt; right) {
    <span class="kw">const</span> sum = nums[left] + nums[right];

    <span class="kw">if</span> (sum === target)  <span class="kw">return</span> [left, right]; <span class="cmt">// found it</span>
    <span class="kw">if</span> (sum &lt; target)   left++;  <span class="cmt">// need bigger sum</span>
    <span class="kw">if</span> (sum > target)   right--; <span class="cmt">// need smaller sum</span>
  }
}</div>

<div class="callout callout-warn"><strong>Important</strong> Standard Two Pointers requires a sorted array. If the array is NOT sorted, use a HashMap (like in the regular Two Sum problem).</div>

<h2>Why Is It Efficient?</h2>
<p>Instead of checking every pair of elements (which would be O(n²) with nested loops), two pointers solves the problem in a single pass — O(n) time.</p>
    `,
    quiz: [
      {
        q: 'Two Pointers is most effective when:',
        opts: [
          'You need to count occurrences of each element',
          'The array is sorted OR you need to compare elements from both ends',
          'The problem involves strings only',
          'You need a HashMap to store extra data'
        ],
        correct: 1,
        explain: 'Two Pointers shines on sorted arrays or when you need to compare from both ends — like palindrome checking or finding pairs that sum to a target.'
      },
      {
        q: 'Checking if "racecar" is a palindrome with Two Pointers. You compare s[left] and s[right]. They match. What do you do next?',
        opts: [
          'Return true immediately',
          'Move left++ and right-- to check the next pair inward',
          'Move only left++',
          'Start over from the beginning'
        ],
        correct: 1,
        explain: 'When characters match, move both pointers inward (left++, right--) to check the next pair. Only return true after the entire loop finishes without a mismatch.'
      },
      {
        q: 'When does the Two Pointer while loop stop?',
        opts: [
          'When left === 0',
          'When right reaches the end',
          'When left >= right (pointers have crossed or met)',
          'After exactly n/2 iterations'
        ],
        correct: 2,
        explain: 'The condition is while (left < right). Once left and right meet or cross, every pair has been checked and there\'s nothing left to compare.'
      }
    ]
  },

  sliding: {
    id: 'sliding',
    icon: '🪟',
    title: 'Sliding Window',
    description: 'Find optimal subarrays or substrings without re-doing work.',
    time: '15 min',
    body: `
<h2>What Is a Sliding Window?</h2>
<p>Imagine a window you can slide across an array or string. The window has a <strong>left edge</strong> and a <strong>right edge</strong>. You expand it by moving right forward, and shrink it by moving left forward.</p>
<p>The key benefit: instead of recalculating from scratch every time, you just add what enters the window on the right and remove what leaves on the left.</p>

<div class="callout callout-tip"><strong>When to use it</strong> "longest subarray/substring" · "shortest subarray that meets a condition" · "maximum sum of k consecutive elements" · any time you're looking at a contiguous range.</div>

<h2>The Template</h2>
<div class="code-block"><span class="kw">let</span> left = <span class="num">0</span>;
<span class="kw">let</span> maxLength = <span class="num">0</span>; <span class="cmt">// or whatever you're tracking</span>
<span class="kw">const</span> window = <span class="kw">new</span> <span class="fn">Set</span>(); <span class="cmt">// or a Map, or a sum variable</span>

<span class="kw">for</span> (<span class="kw">let</span> right = <span class="num">0</span>; right &lt; arr.length; right++) {
  <span class="cmt">// 1. Expand: add arr[right] to window</span>
  window.<span class="fn">add</span>(arr[right]);

  <span class="cmt">// 2. Shrink: while window is invalid, remove from left</span>
  <span class="kw">while</span> (window is invalid) {
    window.<span class="fn">delete</span>(arr[left]);
    left++;
  }

  <span class="cmt">// 3. Update your answer</span>
  maxLength = Math.<span class="fn">max</span>(maxLength, right - left + <span class="num">1</span>);
}

<span class="kw">return</span> maxLength;</div>

<h2>Window Size Formula</h2>
<p>At any point, the current window size is: <strong>right - left + 1</strong></p>
<div class="code-block"><span class="cmt">// Example: left = 1, right = 4</span>
<span class="cmt">// Window covers indices 1, 2, 3, 4 → size = 4</span>
<span class="cmt">// Formula: 4 - 1 + 1 = 4  ✓</span></div>

<h2>Example: Longest Substring with Unique Characters</h2>
<div class="code-block"><span class="kw">function</span> <span class="fn">lengthOfLongestSubstring</span>(s) {
  <span class="kw">const</span> window = <span class="kw">new</span> <span class="fn">Set</span>(); <span class="cmt">// chars currently in our window</span>
  <span class="kw">let</span> left = <span class="num">0</span>;
  <span class="kw">let</span> maxLen = <span class="num">0</span>;

  <span class="kw">for</span> (<span class="kw">let</span> right = <span class="num">0</span>; right &lt; s.length; right++) {
    <span class="cmt">// Shrink until no duplicate</span>
    <span class="kw">while</span> (window.<span class="fn">has</span>(s[right])) {
      window.<span class="fn">delete</span>(s[left]);
      left++;
    }

    window.<span class="fn">add</span>(s[right]);            <span class="cmt">// add new char</span>
    maxLen = Math.<span class="fn">max</span>(maxLen, right - left + <span class="num">1</span>);
  }

  <span class="kw">return</span> maxLen;
}</div>

<div class="callout callout-good"><strong>Walk through "abcab"</strong> Window grows: a → ab → abc. Then 'a' seen again → shrink left until 'a' is gone → window: bca. Continue → max = 3.</div>

<h2>Key Insight</h2>
<p>Each character is added to the window at most once (when right passes it) and removed at most once (when left passes it). So even though there's a while loop inside a for loop, the total work is still <strong>O(n)</strong>.</p>
    `,
    quiz: [
      {
        q: 'What does Sliding Window help you avoid?',
        opts: [
          'Using too much memory',
          'Re-processing the same elements by sliding instead of restarting',
          'Writing any loops at all',
          'Storing duplicate values'
        ],
        correct: 1,
        explain: 'Instead of recalculating from scratch each time, sliding the window means you only add what\'s new on the right and remove what\'s old on the left — efficient!'
      },
      {
        q: 'A problem asks: "Find the longest substring with no repeating characters." Which pattern is this?',
        opts: [
          'HashMap frequency counter',
          'Two Pointers on sorted array',
          'Sliding Window',
          'Simple loop with no extra storage'
        ],
        correct: 2,
        explain: '"Longest substring" + "with a condition" = Sliding Window. You grow the window rightward, shrink from the left when a duplicate appears.'
      },
      {
        q: 'Your window has left = 2 and right = 6. What is the current window size?',
        opts: ['4', '5', '6', '8'],
        correct: 1,
        explain: 'Window size = right - left + 1 = 6 - 2 + 1 = 5. Always add 1 because both endpoints are included.'
      }
    ]
  },

  bigo: {
    id: 'bigo',
    icon: '⏱️',
    title: 'Big-O Basics',
    description: 'Talk about efficiency without needing a CS degree.',
    time: '10 min',
    body: `
<h2>What Is Big-O?</h2>
<p>Big-O describes how your solution <strong>scales</strong> as the input gets bigger. You don't need to know the math — you just need to recognize the common cases and explain them simply.</p>

<h2>The 3 You Must Know</h2>

<div class="callout callout-good"><strong>O(1) — Constant Time</strong> No matter how big the input, it takes the same amount of time. Example: looking up a value in a Map, accessing arr[0].</div>

<div class="callout callout-tip"><strong>O(n) — Linear Time</strong> As input doubles, the work doubles. Example: one loop through an array of n elements.</div>

<div class="callout callout-warn"><strong>O(n²) — Quadratic Time</strong> A loop inside a loop. Input doubles → work quadruples. Example: checking every pair of elements.</div>

<h2>Spotting It in Code</h2>
<div class="code-block"><span class="cmt">// O(1) — no loop, just one operation</span>
<span class="kw">const</span> first = arr[<span class="num">0</span>];

<span class="cmt">// O(n) — one loop through n elements</span>
<span class="kw">for</span> (<span class="kw">const</span> num <span class="kw">of</span> nums) { ... }

<span class="cmt">// O(n²) — loop inside a loop</span>
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; n; i++) {
  <span class="kw">for</span> (<span class="kw">let</span> j = <span class="num">0</span>; j &lt; n; j++) { ... }
}</div>

<h2>Space Complexity</h2>
<p>Space complexity is about how much <strong>extra memory</strong> your solution uses:</p>
<div class="code-block"><span class="cmt">// O(1) space — only a few variables, no structures that grow</span>
<span class="kw">let</span> min = Infinity;
<span class="kw">let</span> max = <span class="num">0</span>;

<span class="cmt">// O(n) space — a Set or Map that can grow up to n elements</span>
<span class="kw">const</span> seen = <span class="kw">new</span> <span class="fn">Set</span>(); <span class="cmt">// could hold up to n items</span></div>

<h2>What to Say in the Exam</h2>
<p>Pinterest wants to hear you think about this. Here are phrases that sound great:</p>
<ul>
  <li><strong>"This is O(n) time"</strong> → "because I loop through the array exactly once"</li>
  <li><strong>"This is O(n) space"</strong> → "because my HashMap can store up to n entries"</li>
  <li><strong>"The brute force is O(n²)"</strong> → "but using a HashMap brings it down to O(n)"</li>
  <li><strong>"This is O(1) space"</strong> → "because I only use a couple of variables"</li>
</ul>

<div class="callout callout-good"><strong>The Golden Rule</strong> One loop through n items = O(n). A Map lookup inside that loop is O(1) — so the total stays O(n). This is why HashMaps make things faster.</div>
    `,
    quiz: [
      {
        q: 'Your solution has two nested for loops (a loop inside a loop). What is the time complexity?',
        opts: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
        correct: 2,
        explain: 'For each of the n elements in the outer loop, you loop through n elements again: n × n = n². Two nested loops = O(n²).'
      },
      {
        q: 'You use a HashMap lookup INSIDE a single for loop through an array. What is the total time complexity?',
        opts: ['O(n²)', 'O(n)', 'O(1)', 'O(n log n)'],
        correct: 1,
        explain: 'One loop = O(n). HashMap lookup = O(1). O(n) × O(1) = O(n). This is exactly why we use HashMaps — they keep it at O(n) instead of O(n²).'
      },
      {
        q: 'How would you explain O(n) space complexity out loud in an interview?',
        opts: [
          '"My solution uses no memory at all"',
          '"I store everything twice"',
          '"The extra memory I use grows proportionally with the input size"',
          '"Space complexity doesn\'t matter here"'
        ],
        correct: 2,
        explain: '"The extra memory I use grows proportionally with the input size" is exactly right. If input has 100 items, your HashMap might store up to 100 entries. Input doubles → storage doubles.'
      }
    ]
  }
};

// ===== ALL PROBLEMS =====
const PROBLEMS = {
  'contains-duplicate': {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    pattern: 'Set / HashMap',
    description: 'Given an integer array <strong>nums</strong>, return <strong>true</strong> if any value appears <strong>at least twice</strong> in the array, and return <strong>false</strong> if every element is distinct.',
    examples: [
      { input: 'nums = [1, 2, 3, 1]', output: 'true', note: '1 appears twice' },
      { input: 'nums = [1, 2, 3, 4]', output: 'false', note: 'all distinct' },
      { input: 'nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]', output: 'true' }
    ],
    decoder: {
      restate: 'Go through the array and check if I\'ve seen any number before. If I have → return true. If I finish without finding a repeat → return false.',
      input: 'An array of integers (nums)',
      output: 'A boolean — true if duplicate exists, false if all are unique',
      edgeCases: 'Empty array → false (nothing to duplicate). One element → false (can\'t be a duplicate).',
      pattern: 'Set — I need to track what I\'ve already seen. A Set is perfect because it only stores unique values.'
    },
    hints: [
      'Think about keeping a "memory" of numbers you\'ve already seen. What data structure in JavaScript lets you store a collection of unique values and check instantly if something is already in it?',
      'As you loop through each number, ask: "Have I seen this before?" If yes → you found a duplicate! If no → add it to your memory and keep going.',
      'Use a Set. After adding each number, check if it already exists with seen.has(num) before adding. Return true the moment you find a duplicate.'
    ],
    solution: {
      code: `function containsDuplicate(nums) {
  const seen = new Set(); // track numbers we've visited

  for (const num of nums) {
    if (seen.has(num)) {
      return true; // found a duplicate!
    }
    seen.add(num); // haven't seen it yet, remember it
  }

  return false; // no duplicates found
}`,
      steps: [
        'Create a Set called "seen" to remember numbers we\'ve visited',
        'Loop through every number in the array',
        'For each number: check if it\'s already in our Set',
        'If yes → duplicate found! Return true immediately',
        'If no → add it to the Set and continue the loop',
        'After the loop ends with no duplicates found → return false'
      ],
      time: 'O(n)',
      space: 'O(n)',
      timeNote: 'We loop through the array once — one operation per element',
      spaceNote: 'Our Set can grow to hold up to n elements in the worst case'
    }
  },

  'two-sum': {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    pattern: 'HashMap',
    description: 'Given an array of integers <strong>nums</strong> and an integer <strong>target</strong>, return the <strong>indices</strong> of the two numbers that add up to target. You may assume exactly one solution exists.',
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', note: '2 + 7 = 9' },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]', note: '2 + 4 = 6' },
      { input: 'nums = [3, 3], target = 6', output: '[0, 1]' }
    ],
    decoder: {
      restate: 'Find two numbers that add up to target. Return their index positions (not the numbers themselves — their positions in the array).',
      input: 'An array of numbers (nums) + a target number',
      output: 'An array of two index positions, like [0, 3]',
      edgeCases: 'The problem guarantees exactly one solution — no need to handle "no answer" case.',
      pattern: 'HashMap — store each number and its index as I loop. Before storing, check if the "complement" (target - current number) has already been stored.'
    },
    hints: [
      'For each number you visit, ask: "What other number would I need to reach the target?" That number is: target - nums[i]. This is called the "complement".',
      'Use a Map to store numbers you\'ve already seen AND their index positions. Before you store a number, check if its complement is already in the Map.',
      'If map.has(target - nums[i]) → you found both numbers! Return [map.get(target - nums[i]), i]. Otherwise, store nums[i] → i in the map and continue.'
    ],
    solution: {
      code: `function twoSum(nums, target) {
  const seen = new Map(); // stores: number → its index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]; // what do we need?

    if (seen.has(complement)) {
      return [seen.get(complement), i]; // found the pair!
    }

    seen.set(nums[i], i); // store this number with its index
  }
}`,
      steps: [
        'Create a Map to store numbers we\'ve seen, mapped to their index',
        'Use a classic for loop (we need the index i)',
        'For each number, calculate the "complement": target - nums[i]',
        'Check if the complement already exists in our Map',
        'If yes → we found the pair! Return [complement\'s index, current index]',
        'If no → add the current number and its index to the Map',
        'Repeat until the pair is found (problem guarantees a solution)'
      ],
      time: 'O(n)',
      space: 'O(n)',
      timeNote: 'One loop through the array, O(1) Map operations inside',
      spaceNote: 'Map can store up to n entries in the worst case'
    }
  },

  'valid-anagram': {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    pattern: 'HashMap Frequency Counter',
    description: 'Given two strings <strong>s</strong> and <strong>t</strong>, return <strong>true</strong> if t is an anagram of s, and <strong>false</strong> otherwise. An anagram uses the exact same letters in any order (e.g. "listen" → "silent").',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' },
      { input: 's = "ab", t = "a"', output: 'false', note: 'different lengths' }
    ],
    decoder: {
      restate: 'Check if both strings use the exact same letters the exact same number of times — just in a different order.',
      input: 'Two strings: s and t',
      output: 'A boolean — true if anagram, false if not',
      edgeCases: 'If lengths are different → automatically false (can\'t be an anagram). Empty strings → true.',
      pattern: 'Frequency Counter HashMap — count how many times each letter appears in s, then verify t has the same counts.'
    },
    hints: [
      'If the strings have different lengths, you can return false immediately — they can\'t be anagrams. This is a quick check that saves work.',
      'Build a frequency map for string s: loop through every character and count how many times each one appears (e.g. {a: 3, n: 1, g: 1, r: 1, m: 1}).',
      'Now loop through string t. For each character, decrement its count in the map. If a character isn\'t in the map, or its count drops below 0, return false. If you get through all of t → return true.'
    ],
    solution: {
      code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false; // quick check

  const count = new Map();

  // Count every letter in s
  for (const char of s) {
    count.set(char, (count.get(char) || 0) + 1);
  }

  // Check t against the counts
  for (const char of t) {
    if (!count.has(char)) return false;       // letter not in s
    count.set(char, count.get(char) - 1);
    if (count.get(char) < 0) return false;    // too many of this letter
  }

  return true;
}`,
      steps: [
        'Quick check: if lengths differ, return false immediately',
        'Build a frequency map by counting every character in s',
        'Loop through string t, decrementing the count for each character',
        'If a character from t isn\'t in the map → not an anagram, return false',
        'If a count goes below 0 → t has more of that letter than s → return false',
        'Survived both loops → same letters, same counts → return true'
      ],
      time: 'O(n)',
      space: 'O(1)',
      timeNote: 'Two loops through strings of length n — still O(n) total',
      spaceNote: 'At most 26 letters stored (the alphabet) — this is O(1) constant space'
    }
  },

  'best-time': {
    id: 'best-time',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    pattern: 'Loop with Running Minimum',
    description: 'You are given an array <strong>prices</strong> where prices[i] is the price on day i. Return the <strong>maximum profit</strong> from buying on one day and selling on a later day. Return 0 if no profit is possible.',
    examples: [
      { input: 'prices = [7, 1, 5, 3, 6, 4]', output: '5', note: 'Buy at 1, sell at 6' },
      { input: 'prices = [7, 6, 4, 3, 1]', output: '0', note: 'Prices only go down — no profit possible' }
    ],
    decoder: {
      restate: 'Track the lowest price seen so far as I loop. For each price, calculate profit if I sold today. Keep the highest profit I\'ve seen.',
      input: 'An array of prices (numbers)',
      output: 'A number — the maximum profit possible (minimum 0)',
      edgeCases: 'All prices decreasing → return 0. One price → return 0. Must buy BEFORE you sell.',
      pattern: 'Loop with running minimum — no HashMap needed. Just track two variables: minPrice and maxProfit.'
    },
    hints: [
      'You want to buy at the lowest price and sell at the highest price AFTER that. As you loop through prices, keep track of the lowest price you\'ve seen so far.',
      'For each price, ask: "If I sell today, what\'s my profit?" That\'s currentPrice - minPrice. Track the best profit you\'ve seen.',
      'Use two variables: minPrice (starts at Infinity) and maxProfit (starts at 0). Update minPrice when you find a lower price, update maxProfit when you find a better profit. Return maxProfit.'
    ],
    solution: {
      code: `function maxProfit(prices) {
  let minPrice = Infinity; // lowest price seen so far
  let maxProfit = 0;       // best profit seen so far

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;          // found a cheaper buy day
    } else {
      const profit = price - minPrice;
      maxProfit = Math.max(maxProfit, profit); // update best profit
    }
  }

  return maxProfit;
}`,
      steps: [
        'Start minPrice at Infinity (so any real price will replace it)',
        'Start maxProfit at 0 (worst case is no profit)',
        'Loop through every price',
        'If this price is lower than our minimum → update minPrice (better buy day)',
        'Otherwise → calculate profit if we sold today and update maxProfit if it\'s better',
        'Return maxProfit after the loop'
      ],
      time: 'O(n)',
      space: 'O(1)',
      timeNote: 'One loop through the prices array',
      spaceNote: 'Only two variables used — constant space regardless of input size'
    }
  },

  'longest-substring': {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    pattern: 'Sliding Window + Set',
    description: 'Given a string <strong>s</strong>, find the <strong>length</strong> of the longest substring without any repeating characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', note: '"abc" has length 3' },
      { input: 's = "bbbbb"', output: '1', note: '"b" is the longest unique substring' },
      { input: 's = "pwwkew"', output: '3', note: '"wke" has length 3' }
    ],
    decoder: {
      restate: 'Find the longest section of the string where no letter repeats. Return its length.',
      input: 'A string s',
      output: 'A number — the length of the longest valid (no-repeat) substring',
      edgeCases: 'Empty string → 0. All same characters (like "bbbbb") → 1.',
      pattern: 'Sliding Window + Set. Use a window that only contains unique characters. Expand right, shrink left when a duplicate enters.'
    },
    hints: [
      'Think of a "window" (a range of the string) that slides forward. Your window should only contain unique characters. Use a Set to track what\'s inside the window at any time.',
      'Move the "right" pointer forward to expand the window. When s[right] is already in the window (duplicate!), move the "left" pointer forward (and remove s[left] from the Set) until the duplicate is gone.',
      'After every valid expansion, update your max length: Math.max(maxLen, right - left + 1). The +1 is because both ends are included in the count.'
    ],
    solution: {
      code: `function lengthOfLongestSubstring(s) {
  const window = new Set(); // chars currently in our window
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    // Shrink window until no duplicate
    while (window.has(s[right])) {
      window.delete(s[left]);
      left++;
    }

    window.add(s[right]);                            // add new char
    maxLen = Math.max(maxLen, right - left + 1);     // update max
  }

  return maxLen;
}`,
      steps: [
        'Use a Set to track characters currently in our sliding window',
        'Right pointer expands the window one character at a time',
        'When s[right] is already in the window → we have a duplicate',
        'Shrink from the left: remove s[left] from Set, move left forward — repeat until no duplicate',
        'Add the new character s[right] to the window',
        'Update maxLen with current window size (right - left + 1)',
        'Return maxLen after the right pointer reaches the end'
      ],
      time: 'O(n)',
      space: 'O(n)',
      timeNote: 'Each character is added once and removed once — O(2n) = O(n)',
      spaceNote: 'Set can hold up to n characters in the worst case'
    }
  }
};

// ===== ORDERED LIST FOR NAV/DASHBOARD =====
const LESSON_ORDER = ['decoder', 'loops', 'hashmap', 'twopointers', 'sliding', 'bigo'];
const PROBLEM_ORDER = ['contains-duplicate', 'two-sum', 'valid-anagram', 'best-time', 'longest-substring'];
const ALL_SECTIONS = [...LESSON_ORDER.map(id => 'lesson-' + id), ...PROBLEM_ORDER.map(id => 'problem-' + id)];
