var tableData = document.getElementById('standings').getElementsByTagName('tbody').item(0);
var rowData = tableData.getElementsByTagName('tr'); 

var last_score = 100;
var e = true;
for(var i = 1; i < rowData.length; ++i)
{
	var score = rowData.item(i).getElementsByTagName('td').item(15).innerHTML;
	if (score !== last_score)
	{
		last_score = score;
		e = !e;
	}
	if (e)
	{
		for (var j=0;j<17;++j)
		{
			rowData.item(i).getElementsByTagName('td').item(j).className = "total1";
		}
	}
}


for(var i = 1; i < rowData.length; ++i)
{
	rowData.item(i).getElementsByTagName('td').item(15).className = "total";
}

var solved = [];
var penalty = [];
for(var i = 1; i < rowData.length; ++i)
{
	solved[i] = parseInt(rowData.item(i).getElementsByTagName('td').item(15).innerHTML);
	penalty[i] = parseInt(rowData.item(i).getElementsByTagName('td').item(16).innerHTML);
}
for(var i = 0; i < rowData.length - 1; i++)
{
	for(var j = 1; j < rowData.length - (i + 1); j++)
	{
		//Swap row nodes if short condition matches
		if(solved[j+1] > solved[j] || solved[j+1]==solved[j] && penalty[j+1] < penalty[j])
		{
			tableData.insertBefore(rowData.item(j+1),rowData.item(j));
			var t = solved[j];
			solved[j] = solved[j+1];
			solved[j+1] = t;
			t = penalty[j];
			penalty[j] = penalty[j+1];
			penalty[j+1] = t;
		}
	}
}

for(var i = 1; i < rowData.length; ++i)
{
	rowData.item(i).getElementsByTagName('td').item(0).innerHTML = i;
}

for(var i = 1; i < rowData.length; ++i)
{
	var name = rowData.item(i).getElementsByTagName('td').item(14).innerHTML;
	if (name.indexOf('(') == -1 && name.indexOf('+') >= 0)
	{
		for (var j=14;j<=14;++j)
			if (rowData.item(i).getElementsByTagName('td').item(j).innerHTML.indexOf('+') >= 0)
				rowData.item(i).getElementsByTagName('td').item(j).innerHTML += '<br>(0:00)';
	}
}


for(var i = 1; i < rowData.length; ++i)
{
	var name = rowData.item(i).getElementsByTagName('td').item(1).innerHTML;
	if (name.indexOf('*') > -1
		|| name.indexOf('out of contest') > -1
		|| name.indexOf('kyiv') > -1)
		{
			tableData.removeChild(rowData.item(i));
			--i;
		}
}