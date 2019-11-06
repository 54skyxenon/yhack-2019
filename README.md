# YHack 2019


<img src="./frontend/src/assets/logo.jpg" />


### Contributors: Brandon Liang (Frontend), Dennis Lo (Backend), Stephanie Ginovker (Backend), and  Kanupriya Agarwal (UI/UX).

We competed in the category of "Graph Database Search and Compare (EDR)". The frontend is written in React.JS and the backend is written in Python with Flask and a Neo4j Bolt driver. The graph database solution we used was Neo4j with its Cypher query language.

The problem statement was as follows:
<blockquote>
Comparing collections of current and historic addresses is a difficult problem that combines address standardization, geocoding, and fuzzy search. Street names and cities have aliases that are well known such as “Boston Post Road” and “US Route 1” or “NYC” and “New York City”, but historic aliases can be difficult to find.

Traditional databases (SQL Server, Oracle) are excellent at storing large tables of well understood data and searching for data that meets a pre-defined structure. Graph databases (Neo4J, Amazon AWS Neptune) are excellent of storing both an object and its relationship to another object. This is similar to how Facebook stores people and their relationships to friends and products.

There is something naturally “graphy” about addresses that we’d like to explore. A country contains a state which contains a city which contains a street on which are addresses and businesses.
</blockquote>

We satisfied the given requirements:


<blockquote>
	<ul>
		<li>Load mailing address datasets into the graph database. </li>
		<li>Create a pattern matching algorithm to select records from the database using a single address.</li>
		<li>Create a comparison algorithm to highlight differences and similarities between two datasets.</li>
		<li>[Optional] Create a visualization of the graph.</li>
	</ul>
</blockquote>

We used datasets from this <a href="https://github.com/EDRInc/RaD-EdrCore-Public">GitHub repository</a>.
