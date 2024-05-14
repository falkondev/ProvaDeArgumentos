function valida_entrada(textbox){

	textbox = textbox.replace(/\s/g, '');  //retira todos os espaços


	for(var i = 0; i < textbox.length; i++)
	{
		var texto = textbox[i];

		var temseta = false;
		var temsetadupla = false;

		if(texto == '<')
		{
			if(textbox[i + 1] == '-' && textbox[i + 2] == '>')
			{
				temsetadupla = true;
			}
		}
		else if(texto == '-')
		{
			if(textbox[i - 1] == '<' && textbox[i + 1] == '>')
			{
				temsetadupla = true;
			}
			else if(textbox[i + 1] == '>')
			{
				temseta = true;
			}
		}
		else if(texto == '>')
		{
			if(textbox[i - 2] == '<' && textbox[i - 1] == '-')
			{
				temsetadupla = true;
			}
			else if(textbox[i - 1] == '-')
			{
				temseta = true;
			}
		}

		if(!(((texto.charCodeAt() >= 97 && texto.charCodeAt() <= 122) || (texto.charCodeAt() >= 65 && texto.charCodeAt() <= 90)) || (texto == '(' || texto == ')' || texto == '¬' || texto == '~' || texto == '^' || texto == '↔' || texto == '→' || temsetadupla || temseta)))
		{	
			return retorna_erro();
		}
	}
	/*************************Verificação do v************************/
	if(textbox.indexOf("v") > -1) //isola o caracter OU(v) das demais letras ao fazer UPPERCASE
	{	
		var termos = textbox.split("v");
		textbox = "";

		for(var i = 0; i < termos.length - 1; i++)
		{
			termos[i] = termos[i].toUpperCase();
			textbox = textbox + termos[i] + "v";
		}
		textbox = textbox + termos[termos.length - 1].toUpperCase();
	}
	else
	{
		textbox = textbox.toUpperCase();  //deixa todas as letras em UPPERCASE caso não tenha OU na expressão
	}
	/*******************************************************************/
	/*************************Substituição do ~*************************/
	if (textbox.indexOf("~") > -1)
	{
		textbox = textbox.replace(/~/g, '¬');
	}
	/*******************************************************************/
	/*************************Substituição do <->***********************/
	if (textbox.indexOf("<->") > -1) {
		textbox = textbox.replace(/<->/g, '↔');//↔
	}
	/******************************************************************/
	/*************************Substituição do ->************************/
	if(textbox.indexOf("->") > -1){
		textbox = textbox.replace(/->/g, '→');
	}
	/******************************************************************/
	/****************************Validação******************************/
	if((((textbox.split("↔").length -1 >= 1) || (textbox.split("→").length -1 >= 1)) || ((textbox.split("v").length -1 >= 1) || (textbox.split("^").length -1 >= 1)) || (((textbox.length) - (textbox.split('(').length -1) - (textbox.split('(').length -1)) == 1)) && textbox.length !=2 || (((textbox.length) - (textbox.split('(').length - 1) - (textbox.split(')').length -1) - (textbox.split('¬').length -1)) == 1)) //Verifica se tem operadores
	{
		for(var i = 0; i < textbox.length;i++) //For verifica cada elemento se é igual ao da frente
		{
			if(textbox[i] === '↔' && textbox[i+1] === '↔')
			{
				return retorna_erro();
			}
			else if(textbox[i] == '↔' && textbox[i+1] == '→')
			{
				return retorna_erro();
			}
			else if(textbox[i] == '↔' && textbox[i+1] == 'v')
			{
				return retorna_erro();
			}
			else if(textbox[i] == '↔' && textbox[i+1] == '^')
			{
				return retorna_erro();
			}
			else if(textbox[i] == '→' && textbox[i+1] == '↔')
			{
				return retorna_erro();
			}
			else if(textbox[i] == '→' && textbox[i+1] == '→')
			{
				return retorna_erro();
			}
			else if(textbox[i] == '→' && textbox[i+1] == 'v')
			{
				return retorna_erro();
			}
			else if(textbox[i] == '→' && textbox[i+1] == '^')
			{
				return retorna_erro();
			}
			else if(textbox[i] == 'v' && textbox[i+1] == '↔')
			{
				return retorna_erro();
			}
			else if(textbox[i] == 'v' && textbox[i+1] == '→')
			{
				return retorna_erro();
			}
			else if(textbox[i] == 'v' && textbox[i+1] == 'v')
			{
				return retorna_erro();
			}
			else if(textbox[i] == 'v' && textbox[i+1] == '^')
			{
				return retorna_erro();
			}
			else if(textbox[i] == '^' && textbox[i+1] == '↔')
			{
				return retorna_erro();
			}
			else if(textbox[i] == '^' && textbox[i+1] == '→')
			{
				return retorna_erro();
			}
			else if(textbox[i] == '^' && textbox[i+1] == 'v')
			{
				return retorna_erro();
			}
			else if(textbox[i] == '^' && textbox[i+1] == '^')
			{
				return retorna_erro();
			}
		}
		if(textbox.split("(").length -1 >= 1) //Testa se há abertura de parenteses no arquivo
		{
			if(textbox.split(")").length -1 >= 1) //Significa que está tudo certo, abriu parenteses em algum lugar
			{
				//variaveis que contam os parenteses '(''  e  ')'
				var count_abrep = 0;
				var count_fechap = 0;
				for(var i = 0; i < textbox.length; i++) // for verifica cada item digitado
				{
					if(textbox[i] == '(') //se tiver (  conta + 1
					{
						count_abrep++;
					}
					else if(textbox[i] == ')') //se tiver )  conta + 1
					{
						count_fechap++;
					}
				}

				if(count_abrep == count_fechap) //Compara se existe o mesmo numero de '('  e  ')'
				{
					var conta_neg = 0;

					if(textbox[0] == '¬')
					{
						while(textbox[0] == '¬')
						{
							conta_neg++;
							textbox = textbox.replace(/^¬/, "");
						}
					}

					if(textbox[0] == '(') //Verifica se a expressão começa abrindo parenteses
					{
						var conta_par = 1;
						var tem_fora = false;
						for(var i = 1; i < textbox.length; i++) 
						{
							if(textbox[i] == '(') // se tiver abertuda soma +1
							{
								conta_par++;
							}
							else if(textbox[i] == ')') // se tiver fechamento, diminui -1
							{
								conta_par--;
							}

							if(conta_par == 0) //quando chegar a 0, siginifica que o primeiro parenteses fechou
							{
								conta_par++;
								if(i == (textbox.length -1)) //se está no ultimo i
								{
									tem_fora = true;
								}
							}
						}

						if(tem_fora && conta_neg > 0) //significa que tem um ¬ na frente de tudo
						{
							var texto_negacoes = "";
							for(var i = 0; i < conta_neg; i++)
							{
								texto_negacoes += '¬';
							}
							if(retira_p(textbox).length == 1)
							{
								return texto_negacoes + retira_p(textbox);
							}
							return texto_negacoes + '(' + retira_p(textbox) + ')';
						}
						else if(tem_fora)  //significa que abriu e fechou parenteses no começo
						{
							return retira_p(textbox);
						}
						else 
						{	
							var texto_negacoes = "";
							for(var i = 0; i < conta_neg; i++)
							{
								texto_negacoes += '¬';
							}
							return continua_codigo(texto_negacoes + textbox);
						}	
					}
					else //significa que não há parenteses no inicio
					{
						var texto_negacoes = "";
						for(var i = 0; i < conta_neg; i++)
						{
							texto_negacoes += '¬';
						}
						return texto_negacoes + continua_codigo(textbox);
					}
				}
				else // Significa que existe erro nos parenteses
				{
					return retorna_erro();
				}
			}
			else //Significa que abriu mas não fechou parenteses
			{
				return retorna_erro();
			}
		}
		else //Significa que não foi aberto parenteses
		{
			if(textbox.split(")").length -1 >= 1) //Testa se há fechamento de parenteses no arquivo
			{
				return retorna_erro();
			}
			else //Significa que está certo, não foi aberto parenteses nenhum
			{
				if((textbox.length - (textbox.split('¬').length - 1)) > 3)
				{
					return verifica_sse(textbox);
				}
				else
				{
					return textbox;
				}
			}
		}
	}
	else
	{
		return retorna_erro();
	}
	
	/*******************************************************************/
}
function retorna_erro()
{
	var texto = document.getElementById('textarea');
	texto.innerHTML = "Insira uma premissa válida!";
	texto.style.color = "red";
	
	return false;
}

function verifica_sse(texto)
{
	if((texto.split('↔').length -1) >= 1) //Testa se existe <->
	{
		if(texto.split('↔').length - 1 > 1) //Teste se existe apenas 1 <->
		{
			if(texto.split('→').length - 1 >= 1 || texto.split('v').length - 1 >= 1 || texto.split('^').length - 1 >= 1)
			{
				var pos = 0;

				for(var i = 0; i < texto.length; i++)
				{
					if(texto[i] == '↔')
					{
						pos = i;
					}	
				}
				var sinal = texto[pos];
				var texto2 = "";
				
				for(var i = 0; i < texto.length; i++)
				{
					if(i == pos)
					{
						texto2 = texto2 + "=";
					}
					else
					{
						texto2 = texto2 + texto[i];
					}	
				}
				texto = texto2;

				var termos = texto.split('=');

				for(var i = 0; i < termos.length; i++)
				{
					if(termos[i].length - (termos[i].split('¬') - 1) == 2)
					{
						return retorna_erro();
					}
					else if(termos[i].length - (termos[i].split('¬').length - 1) >= 3)
					{
						if(termos[i].length - (termos[i].split('¬').length - 1) > 3)
						{
							termos[i] = verifica_sse(termos[i]);
						}
						termos[i] = '(' + termos[i] + ')';
					}
				}

				texto = termos[0] + '↔' + termos[1];
				return texto;
			}
			else
			{
				var termos = texto.split('↔');

				for(var i = 0; i < termos.length - 1; i++)
				{				
					termos[i + 1] = '(' + termos[i] + '↔' + termos[i + 1] + ')';
				}

				termos[termos.length - 1] = termos[termos.length - 1].replace(/^\(/, "");
				termos[termos.length - 1] = termos[termos.length - 1].replace(/\)$/, "");

				return termos[termos.length - 1];
			}	
		}
		else
		{	
			var termos = texto.split('↔');
			for(var i = 0; i < termos.length; i++)
			{
				if((termos[i].length - (termos[i].split('¬').length -1)) == 1) //testa se ha 1 termo
				{
				}
				else if((termos[i].length - (termos[i].split('¬').length -1)) == 2) //testa se ha 2 termos
				{
					return retorna_erro();
				}
				else if((termos[i].length - (termos[i].split('¬').length -1)) == 3) //testa se ha 3 termos
				{
					termos[i] = "(" + termos[i] + ")";
				}
				else //significa que ha mais de 3 termos e deve-se verificar
				{
					termos[i] = "(" + verifica_se(termos[i]) + ")";
				}
			}
			var textbox = "";
			for(var i = 0; i < termos.length; i++)
			{
				textbox = textbox + termos[i] + "↔";
			}
			textbox = textbox.replace(/↔$/, "");
			return textbox;
		}
	}
	else
	{
		return verifica_se(texto);
	}
}

function verifica_se(texto)
{
	if((texto.split('→').length -1) >= 1)
	{
		if(texto.split('→').length - 1 > 1)
		{
			if(texto.split('v').length - 1 >= 1 || texto.split('^').length - 1 >= 1)
			{
				var pos = 0;

				for(var i = 0; i < texto.length; i++)
				{
					if(texto[i] == '→')
					{
						pos = i;
					}	
				}
				var sinal = texto[pos];
				var texto2 = "";
				
				for(var i = 0; i < texto.length; i++)
				{
					if(i == pos)
					{
						texto2 = texto2 + "=";
					}
					else
					{
						texto2 = texto2 + texto[i];
					}	
				}
				texto = texto2;

				var termos = texto.split('=');

				for(var i = 0; i < termos.length; i++)
				{
					if(termos[i].length - (termos[i].split('¬') - 1) == 2)
					{
						return retorna_erro();
					}
					else if(termos[i].length - (termos[i].split('¬').length - 1) >= 3)
					{
						var count_neg = 0;

						if(termos[i][0] == '¬')
						{
							while(termos[i][0] == '¬')
							{
								count_neg++;
								termos[i][0] = termos[i][0].replace(/^¬/, "");
							}
						}
						if(termos[i].length - (termos[i].split('¬').length - 1) > 3)
						{
							termos[i] = verifica_sse(termos[i]);
						}
						var texto_negg = "";
						if(count_neg > 0)
						{
							for(var m = 0; m < count_neg; m++)
							{
								texto_neg += '¬';
							}
						}
						
						termos[i] = texto_negg + '(' + termos[i] + ')';
					}
				}

				texto = termos[0] + '→' + termos[1];
				return texto;
			}
			else
			{
				var termos = texto.split('→');

				for(var i = 0; i < termos.length - 1; i++)
				{				
					termos[i + 1] = '(' + termos[i] + '→' + termos[i + 1] + ')';
				}

				termos[termos.length - 1] = termos[termos.length - 1].replace(/^\(/, "");
				termos[termos.length - 1] = termos[termos.length - 1].replace(/\)$/, "");

				return termos[termos.length - 1];
			}	
		}
		else
		{	
			var termos = texto.split('→');
			for(var i = 0; i < termos.length; i++)
			{
				if((termos[i].length - (termos[i].split('¬').length -1)) == 1) //testa se ha 1 termo
				{
				}
				else if((termos[i].length - (termos[i].split('¬').length -1)) == 2) //testa se ha 2 termos
				{
					return retorna_erro();
				}
				else if((termos[i].length - (termos[i].split('¬').length -1)) == 3) //testa se ha 3 termos
				{
					termos[i] = "(" + termos[i] + ")";
				}
				else //significa que ha mais de 3 termos e deve-se verificar
				{
					termos[i] = "(" + verifica_se(termos[i]) + ")";
				}
			}
			var textbox = "";
			for(var i = 0; i < termos.length; i++)
			{
				textbox = textbox + termos[i] + "→";
			}
			textbox = textbox.replace(/→$/, "");
			return textbox;
		}
	}
	else
	{
		return verifica_ou(texto);
	}
}

function verifica_ou(texto)
{
	if((texto.split('v').length -1) >= 1)
	{
		if(texto.split('v').length - 1 > 1)
		{
			if(texto.split('^').length - 1 >= 1)
			{
				var pos = 0;

				for(var i = 0; i < texto.length; i++)
				{
					if(texto[i] == 'v')
					{
						pos = i;
					}	
				}
				var sinal = texto[pos];
				var texto2 = "";
				
				for(var i = 0; i < texto.length; i++)
				{
					if(i == pos)
					{
						texto2 = texto2 + "=";
					}
					else
					{
						texto2 = texto2 + texto[i];
					}	
				}
				texto = texto2;

				var termos = texto.split('=');

				for(var i = 0; i < termos.length; i++)
				{
					if(termos[i].length - (termos[i].split('¬') - 1) == 2)
					{
						return retorna_erro();
					}
					else if(termos[i].length - (termos[i].split('¬').length - 1) >= 3)
					{
						if(termos[i].length - (termos[i].split('¬').length - 1) > 3)
						{
							termos[i] = verifica_sse(termos[i]);
						}
						termos[i] = '(' + termos[i] + ')';
					}
				}

				texto = termos[0] + 'v' + termos[1];
				return texto;
			}
			else
			{
				var termos = texto.split('v');

				for(var i = 0; i < termos.length - 1; i++)
				{				
					termos[i + 1] = '(' + termos[i] + 'v' + termos[i + 1] + ')';
				}

				termos[termos.length - 1] = termos[termos.length - 1].replace(/^\(/, "");
				termos[termos.length - 1] = termos[termos.length - 1].replace(/\)$/, "");

				return termos[termos.length - 1];
			}	
		}
		else
		{	
			var termos = texto.split('v');
			for(var i = 0; i < termos.length; i++)
			{
				if((termos[i].length - (termos[i].split('¬').length -1)) == 1) //testa se ha 1 termo
				{
				}
				else if((termos[i].length - (termos[i].split('¬').length -1)) == 2) //testa se ha 2 termos
				{
					return retorna_erro();
				}
				else if((termos[i].length - (termos[i].split('¬').length -1)) == 3) //testa se ha 3 termos
				{
					termos[i] = "(" + termos[i] + ")";
				}
				else //significa que ha mais de 3 termos e deve-se verificar
				{
					termos[i] = "(" + verifica_se(termos[i]) + ")";
				}
			}
			var textbox = "";
			for(var i = 0; i < termos.length; i++)
			{
				textbox = textbox + termos[i] + "v";
			}
			textbox = textbox.replace(/v$/, "");
			return textbox;
		}
	}
	else
	{
		return verifica_e(texto);
	}
}

function verifica_e(texto)
{
	if((texto.split('^').length -1) >= 1)
	{
		if(texto.split('^').length - 1 > 1)
		{
			var termos = texto.split('↔');

			for(var i = 0; i < termos.length - 1; i++)
			{				
				termos[i + 1] = '(' + termos[i] + '↔' + termos[i + 1] + ')';
			}

			termos[termos.length - 1] = termos[termos.length - 1].replace(/^\(/, "");
			termos[termos.length - 1] = termos[termos.length - 1].replace(/\)$/, "");

			return termos[termos.length - 1];
		}
		else
		{	
			var termos = texto.split('^');
			for(var i = 0; i < termos.length; i++)
			{
				if((termos[i].length - (termos[i].split('¬').length -1)) == 1) //testa se ha 1 termo
				{
				}
				else if((termos[i].length - (termos[i].split('¬').length -1)) == 2) //testa se ha 2 termos
				{
					return retorna_erro();
				}
				else if((termos[i].length - (termos[i].split('¬').length -1)) == 3) //testa se ha 3 termos
				{
					termos[i] = "(" + termos[i] + ")";
				}
				else //significa que ha mais de 3 termos e deve-se verificar
				{
					termos[i] = "(" + verifica_se(termos[i]) + ")";
				}
			}
			var textbox = "";
			for(var i = 0; i < termos.length; i++)
			{
				textbox = textbox + termos[i] + "^";
			}
			textbox = textbox.replace(/\^$/, "");
			return textbox;
		}
	}
	else
	{
		if(texto.length - (texto.split('¬').length -1) == 1)
		{
			return texto;
		}
		else
		{
			return retorna_erro();
		}
	}
}

function retira_p(texto)
{
	texto = texto.replace(/^\(/, ""); //retira o parenteses antes do texto
	texto = texto.replace(/\)$/, ""); //retira o parenteses final do texto

	if(texto[0] == '(')
	{
		var conta_par = 1;
		var tem_fora = false;
		for(var i = 1; i < texto.length; i++) 
		{
			if(texto[i] == '(') // se tiver abertuda soma +1
			{
				conta_par++;
			}
			else if(texto[i] == ')') // se tiver fechamento, diminui -1
			{
				conta_par--;
			}

			if(conta_par == 0) //quando chegar a 0, siginifica que o primeiro parenteses fechou
			{
				conta_par++;
				if(i == (texto.length -1)) //se está no ultimo i
				{
					tem_fora = true;
				}
			}
		}	
		if(tem_fora) //significa que abriu e fechou parenteses no começo
		{
			return retira_p(texto);
		}
		else 
		{	
			return continua_codigo(texto);
		}	
	}

	return continua_codigo(texto);
}

function continua_codigo(texto)
{
	if((texto.length - (texto.split('¬').length -1)) == 1) //verifica se restou um termo
	{
		return texto;
	}
	else if ((texto.length - (texto.split('¬').length -1)) == 2) //verifica se restou 2 termos
	{
		return retorna_erro();
	}
	else if (((texto.length - (texto.split('¬').length -1)) == 3)) //verifica se restou 3 termos
	{
		return texto;
	}
	else
	{
		var count_abrep = 0;
		var count_fechap = 0;
		var pos = -1;

		var doublearrowexist = false;
		var arrowexist = false;
		var orexist = false;

		for(var i = 0; i < texto.length; i++) //analisa todos os termos;
		{
			if(texto[i] == '(')
			{
				count_abrep++;
			}
			else if(texto[i] == ')')
			{
				count_fechap++;
			}
			if(texto[i] == '↔' || texto[i] == '→' || texto[i] == 'v' || texto[i] == '^') //verifica onde esta o operador principal
			{
				if(texto[i] == '↔')
				{
					if(count_abrep == count_fechap) //verifica se o simbolo é valido
					{
						pos = i;
						doublearrowexist = true;
					}
				}
				else if(texto[i] == '→')
				{
					if(count_abrep == count_fechap && !doublearrowexist) //verifica se o simbolo é valido
					{
						pos = i;
						arrowexist = true;
					}
				}
				else if(texto[i] == 'v')
				{
					if(count_abrep == count_fechap && !doublearrowexist && !arrowexist) //verifica se o simbolo é valido
					{
						pos = i;
						orexist = true;
					}
				}
				else if(texto[i] == '^')
				{
					if(count_abrep == count_fechap && !doublearrowexist && !arrowexist && !orexist) //verifica se o simbolo é valido
					{
						pos = i;
					}				
				}
				
			}
		}

		var sinal = texto[pos];
		var texto2 = "";
		
		for(var i = 0; i < texto.length; i++)
		{
			if(i == pos)
			{
				texto2 = texto2 + "=";
			}
			else
			{
				texto2 = texto2 + texto[i];
			}
			
		}

		texto = texto2;

		var termos = texto.split('=');

		for(var i = 0; i < termos.length; i++)
		{
			if(((termos[i].split('(').length - 1) >= 1) || ((termos[i].split(')').length - 1) >= 1))
			//verifica se teve parenteses ainda
			{
				if(termos[i].length - (termos[i].split('(').length - 1) - (termos[i].split(')').length - 1) - (termos[i].split('¬').length - 1) == 1) // verifica se há apenas 1 termo dentro
				{
					termos[i] = termos[i].replace(/\(/g, "");
					termos[i] = termos[i].replace(/\)/g, "");
				}
				else if(termos[i].length - (termos[i].split('(').length - 1) - (termos[i].split(')').length - 1) - (termos[i].split('¬').length - 1) == 2)
				{
					return retorna_erro();
				}
				else
				{
					//significa que a expressao (termos[i]) tem parenteses

					var textoi = termos[i];
					var conta_neg = 0;
					var teve_parenteses = false; //antes de retirar todos os parenteses
												//ele verifica se teve algum para adicionar
											   //mais tarde

					if(textoi[0] == '¬')
					{
						while(textoi[0] == '¬')
						{
							textoi = textoi.replace(/^¬/, "");
							conta_neg++;
						}
					}
					
					if((textoi[0] == '(') && (textoi[textoi.length - 1] == ')'))
					{
						var temfora = true; //confere se há parenteses antes e depois da string (sem verificar se ta certo ainda)

						while(temfora) //retira os parenteses
						{
							var conta_par = 1;
							var tem_fora = false; //confere se o primeiro parenteses finalizou
							var foi_final = true; //confere se foi até o final da string
							for(var j = 1; j < textoi.length; j++) 
							{
								if(textoi[j] == '(') // se tiver abertuda soma +1
								{
									conta_par++;
								}
								else if(textoi[j] == ')') // se tiver fechamento, diminui -1
								{
									conta_par--;
								}

								if(conta_par == 0) //quando chegar a 0, siginifica que o primeiro parenteses fechou
								{
									if(j == (textoi.length -1)) //se está no ultimo i
									{
										tem_fora = true;
									}
									else
									{
										foi_final = false;
									}
								}
							}	
							if(tem_fora && foi_final) //significa que abriu e fechou parenteses no começo
							{
								teve_parenteses = true;
								textoi = textoi.replace(/^\(/, ""); //retira o parenteses antes do texto
								textoi = textoi.replace(/\)$/, ""); //retira o parenteses final do texto
								if((textoi[0] != '(') || (textoi[textoi.length -1] != ')'))
								{
									temfora = false;
								}
							}
							else 
							{	
								temfora = false;
							}	
						}
					}
					termos[i] = textoi;
					//verificar se ha parenteses no meio ainda e fazer uma funcao para testar sinal
					if((termos[i].split('(').length - 1) >= 1)
					{
						termos[i] = testa_sinal(termos[i]);
					}
					else
					{
						termos[i] = verifica_sse(termos[i]);
					}
					//caso contrario, jogar a questao para verifica_sse
					var texto_negacoes = "";
					if(teve_parenteses && conta_neg > 0)
					{
						for(var k = 0; k < conta_neg; k++)
						{
							texto_negacoes += '¬';
						}
						termos[i] = texto_negacoes + "(" + termos[i] + ")";
					}
					else if(conta_neg > 0)
					{
						for(var k = 0; k < conta_neg; k++)
						{
							texto_negacoes += '¬';
						}
						termos[i] = "(" + texto_negacoes + termos[i] + ")";
					}
					else
					{
						termos[i] = "(" + termos[i] + ")";
					}
					
				}
			}
			else
			{
				termos[i] = verifica_sse(termos[i]);
				if(termos[i].length - (termos[i].split('¬').length -1) != 1)
				{
					termos[i] = "(" + termos[i] + ")";
				}
			}
		}
		var textbox = "";
		for(var i = 0; i < termos.length; i++)
		{
			textbox = textbox + termos[i] + sinal;
		}
		textbox = textbox.replace(/↔$/, "");
		textbox = textbox.replace(/→$/, "");
		textbox = textbox.replace(/v$/, "");
		textbox = textbox.replace(/\^$/, "");
		var tamanho = textbox.length;

		return textbox;
	}
}

function testa_sinal(texto)
{
	var parenteses_fora = true;
	while(parenteses_fora)
	{
		if(texto[0] == '(')
		{
			var conta_par = 1;
			var tem_fora = false;
			for(var i = 1; i < texto.length; i++) 
			{
				if(texto[i] == '(') // se tiver abertuda soma +1
				{
					conta_par++;
				}
				else if(texto[i] == ')') // se tiver fechamento, diminui -1
				{
					conta_par--;
				}

				if(conta_par == 0) //quando chegar a 0, siginifica que o primeiro parenteses fechou
				{
					conta_par++;
					if(i == (texto.length -1)) //se está no ultimo i
					{
						tem_fora = true;
					}
				}
			}	
			if(tem_fora) //significa que abriu e fechou parenteses no começo
			{
				texto = texto.replace(/^\(/, ""); //retira o parenteses antes do texto
				texto = texto.replace(/\)$/, ""); //retira o parenteses final do texto
			}
			else 
			{	
				parenteses_fora = false;
			}	
		}
		else
		{
			parenteses_fora = false;
		}	
	}

	var count_abrep = 0;
	var count_fechap = 0;
	var pos = -1;

	var doublearrowexist = false;
	var arrowexist = false;
	var orexist = false;

	for(var i = 0; i < texto.length; i++) //analisa todos os termos;
	{
		if(texto[i] == '(')
		{
			count_abrep++;
		}
		else if(texto[i] == ')')
		{
			count_fechap++;
		}
		if(texto[i] == '↔' || texto[i] == '→' || texto[i] == 'v' || texto[i] == '^') //verifica onde esta o operador principal
		{
			if(texto[i] == '↔')
			{
				if(count_abrep == count_fechap) //verifica se o simbolo é valido
				{
					pos = i;
					doublearrowexist = true;
				}
			}
			else if(texto[i] == '→')
			{
				if(count_abrep == count_fechap && !doublearrowexist) //verifica se o simbolo é valido
				{
					pos = i;
					arrowexist = true;
				}
			}
			else if(texto[i] == 'v')
			{
				if(count_abrep == count_fechap && !doublearrowexist && !arrowexist) //verifica se o simbolo é valido
				{
					pos = i;
					orexist = true;
				}
			}
			else if(texto[i] == '^')
			{
				if(count_abrep == count_fechap && !doublearrowexist && !arrowexist && !orexist) //verifica se o simbolo é valido
				{
					pos = i;
				}				
			}
			
		}
	}

	var sinal = texto[pos];
	var texto2 = "";
	
	for(var i = 0; i < texto.length; i++)
	{
		if(i == pos)
		{
			texto2 = texto2 + "=";
		}
		else
		{
			texto2 = texto2 + texto[i];
		}
		
	}

	texto = texto2;

	var termos = texto.split('=');

	for(var i = 0; i < termos.length; i++)
	{
		if(((termos[i].split('(').length - 1) >= 1) || ((termos[i].split(')').length - 1) >= 1))
		//verifica se teve parenteses ainda
		{
			if(termos[i].length - (termos[i].split('(').length - 1) - (termos[i].split(')').length - 1) - (termos[i].split('¬').length - 1) == 1) // verifica se há apenas 1 termo dentro
			{
				termos[i] = termos[i].replace(/\(/g, "");
				termos[i] = termos[i].replace(/\)/g, "");
			}
			else if(termos[i].length - (termos[i].split('(').length - 1) - (termos[i].split(')').length - 1) - (termos[i].split('¬').length - 1) == 2)
			{
				return retorna_erro();
			}
			else
			{
				//significa que a expressao (termos[i]) tem parenteses
				var textoi = termos[i];

				var conta_neg = 0;

				if(textoi[0] == '¬')
				{
					while(textoi[0] == '¬')
					{
						conta_neg++;
						textoi = textoi.replace(/^¬/, "");
					}
				}
				
				if((textoi[0] == '(') && (textoi[textoi.length - 1] == ')'))
				{
					var temfora = true;
					var teve_parentesess = false;
					while(temfora)
					{
						var conta_par = 1;
						var tem_fora = false;
						for(var j = 1; j < textoi.length; j++) 
						{
							if(textoi[j] == '(') // se tiver abertuda soma +1
							{
								conta_par++;
							}
							else if(textoi[j] == ')') // se tiver fechamento, diminui -1
							{
								conta_par--;
							}

							if(conta_par == 0) //quando chegar a 0, siginifica que o primeiro parenteses fechou
							{
								if(j == (textoi.length -1)) //se está no ultimo i
								{
									tem_fora = true;
									teve_parentesess = true;
								}
							}
						}	

						if(tem_fora) //significa que abriu e fechou parenteses no começo
						{
							textoi = textoi.replace(/^\(/, ""); //retira o parenteses antes do texto
							textoi = textoi.replace(/\)$/, ""); //retira o parenteses final do texto
							if((textoi[0] != '(') || (textoi[textoi.length -1] != ')'))
							{
								temfora = false;
							}
						}
						else 
						{	
							temfora = false;
						}	
					}
				}
				termos[i] = textoi;
				//verificar se ha parenteses no meio ainda e fazer uma funcao para testar sinal
				if((termos[i].split('(').length - 1) >= 1)
				{
					termos[i] = testa_sinal(termos[i]);
				}
				else
				{
					termos[i] = verifica_sse(termos[i]);
				}

				var texto_neg = "";
				if(conta_neg >= 1 && teve_parentesess)
				{
					for(var l = 0; l < conta_neg; l++)
					{
						texto_neg += '¬';
					}
					termos[i] = texto_neg + '(' + termos[i] + ')';
				}
				else if(conta_neg >= 1)
				{
					for(var l = 0; l < conta_neg; l++)
					{
						texto_neg += '¬';
					}
					termos[i] = texto_neg + termos[i];
				}
				else
				{
					termos[i] = "(" + termos[i] + ")";	
				}	
			}
		}
		else
		{
			termos[i] = verifica_sse(termos[i]);
			if(termos[i].length - (termos[i].split('¬').length -1) != 1 && neg_parenteses2 == false)
			{
				termos[i] = "(" + termos[i] + ")";
			}
		}
	}
	var textbox = "";
	for(var i = 0; i < termos.length; i++)
	{
		textbox = textbox + termos[i] + sinal;
	}
	textbox = textbox.replace(/↔$/, "");
	textbox = textbox.replace(/→$/, "");
	textbox = textbox.replace(/v$/, "");
	textbox = textbox.replace(/\^$/, "");
	return textbox;
}
