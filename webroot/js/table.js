	var tabela = document.getElementById("table-dashboard");
	var linhas = tabela.getElementsByTagName("tr");
	var choice_tabela = document.getElementById("choice-table-dashboard");
	var choice_linhas = choice_tabela.getElementsByTagName("tr");
	var num_linha = 1;
	var texto_formatado = "";
	var tipo_linha = [];
	var grau = 0;
	var linha_inicio_grau = [];
	var linha_grau = [];
	var can_use = [];

	/**
	Função que adiciona novas linhas à tabela
	**/
	function premissa(){
		var modo = "p";
		var can_use_premisse = true;
		var inicio = 0; final = tabela.rows.length;

		for(var i = inicio; i < final; i++)
		{
			if(linhas[i].cells[2].textContent != 'p')
			{
				can_use_premisse = false;
			}
		}

		if(!can_use_premisse)
		{
			return alert('Você não pode adicionar premissa neste momento');
			clean_row();
		}
		else if(choice_tabela.rows.length > 0)
		{
			return alert('Você não pode adicionar premissa neste momento');
		}

		var info = valida_entrada(textbox.value);
		if(info != false && info != undefined)
		{
			info = fix(info);
		}
		adiciona_tr(modo, info, null, true);
	}

	function inclusao_ou(){
		var selecionado = tabela.getElementsByClassName("selecionado");
		if(selecionado.length == 1)
		{
			var tipo = 'normal';
			var linha_selecionada;
			for(var i = 0; i < linhas.length; i++)
			{
				if(linhas[i].classList.value == "selecionado")
				{
					linha_selecionada = i + 1;
				}
				if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-pc')
				{
					tipo = 'hipotese-pc';
				}
				else if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-raa')
				{
					tipo = 'hipotese-raa';
				}
			}
			var modo = linha_selecionada + " vI";
			var info = valida_entrada(textbox.value);
			
			info = fix(info);
		
			var old_info = remove_graus(info);

			var other = remove_graus(selecionado[0].cells[1].textContent);

			info = add_p(info);
			other = add_p(other);

			//Elemento 1
			var choice_tabela = document.getElementById('choice-table-dashboard');
	        var numeroLinhas = choice_tabela.rows.length;
	        var choice_linha = choice_tabela.insertRow(numeroLinhas);
	        var celula1 = choice_linha.insertCell(0);
	        var celula2 = choice_linha.insertCell(1);
	        var celula3 = choice_linha.insertCell(2);
	        celula1.innerHTML = "1.";   
	        celula2.innerHTML = info + ' v ' + other;
	        celula3.innerHTML =  modo;
        	choice_linhas[numeroLinhas].addEventListener("dblclick", function(){
        	doubleclick(this, modo, tipo);});

	        //Elemento 2
	        numeroLinhas = choice_tabela.rows.length;
	        choice_linha = choice_tabela.insertRow(numeroLinhas);
	        celula1 = choice_linha.insertCell(0);
	        celula2 = choice_linha.insertCell(1);
	        celula3 = choice_linha.insertCell(2);
	        celula1.innerHTML = "2.";
	        celula2.innerHTML = other + ' v ' + info;
	        celula3.innerHTML =  modo;
        	choice_linhas[numeroLinhas].addEventListener("dblclick", function(){
        	doubleclick(this, modo, tipo);});

	        //limpa o campo
	       	textbox.value = "";

			clean_row();
		}
		else
		{
			alert("Selecione exatamente 1 linha");
		}
	}
	function inclusao_e(){
		var selecionados = tabela.getElementsByClassName("selecionado");
		if(selecionados.length == 2)
		{
			termo1 = add_p(remove_graus(selecionados[0].cells[1].textContent));
			termo2 = add_p(remove_graus(selecionados[1].cells[1].textContent));

			var modo = " ^I";

			var tipo = 'normal';
			var linha_selecionada = "";
			for(var i = 0; i < linhas.length; i++)
			{
				if(linhas[i].classList.value == "selecionado")
				{
					linha_selecionada = linha_selecionada + (i + 1) + ', ';
				}
				if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-pc')
				{
					tipo = 'hipotese-pc';
				}
				else if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-raa')
				{
					tipo = 'hipotese-raa';
				}
			}
			linha_selecionada = linha_selecionada.slice(0, -2);
			modo = linha_selecionada + modo;

			//Elemento 1
			var choice_tabela = document.getElementById('choice-table-dashboard');
	        var numeroLinhas = choice_tabela.rows.length;
	        var choice_linha = choice_tabela.insertRow(numeroLinhas);
	        var celula1 = choice_linha.insertCell(0);
	        var celula2 = choice_linha.insertCell(1);
	        var celula3 = choice_linha.insertCell(2);
	        celula1.innerHTML = "1.";   
	        celula2.innerHTML = termo1 + ' ^ ' + termo2;
	        celula3.innerHTML =  modo;
	        choice_linhas[numeroLinhas].addEventListener("dblclick", function(){
	        	doubleclick(this, modo, tipo);
	        });
	        //Elemento 2
	        numeroLinhas = choice_tabela.rows.length;
	        choice_linha = choice_tabela.insertRow(numeroLinhas);
	        celula1 = choice_linha.insertCell(0);
	        celula2 = choice_linha.insertCell(1);
	        celula3 = choice_linha.insertCell(2);
	        celula1.innerHTML = "2.";
	        celula2.innerHTML = termo2 + ' ^ ' + termo1;
	        celula3.innerHTML =  modo;
	        choice_linhas[numeroLinhas].addEventListener("dblclick", function(){
	        	doubleclick(this, modo, tipo);
	        });
	        //limpa o campo
	       	textbox.value = "";
	       	clean_row();
		}
		else
		{
			alert("Selecione exatamente 2 linhas");
		}
	}
	function exclusao_e(){
		var selecionado = tabela.getElementsByClassName("selecionado");

		if(selecionado.length == 1)
		{
			var termo = remove_graus(selecionado[0].cells[1].textContent);
			termo = termo.replace(/\s/g, '');  //retira todos os espaços

			var count_abrep = 0;
			var count_fechap = 0;
			var pos = -1;

			var doublearrowexist = false;
			var arrowexist = false;
			var orexist = false;

			for(var i = 0; i < termo.length; i++) //analisa todos os termos;
			{
				if(termo[i] == '(')
				{
					count_abrep++;
				}
				else if(termo[i] == ')')
				{
					count_fechap++;
				}
				if(termo[i] == '↔' || termo[i] == '→' || termo[i] == 'v' || termo[i] == '^') //verifica onde esta o operador principal
				{
					if(termo[i] == '↔')
					{
						if(count_abrep == count_fechap) //verifica se o simbolo é valido
						{
							pos = i;
							doublearrowexist = true;
						}
					}
					else if(termo[i] == '→')
					{
						if(count_abrep == count_fechap && !doublearrowexist) //verifica se o simbolo é valido
						{
							pos = i;
							arrowexist = true;
						}
					}
					else if(termo[i] == 'v')
					{
						if(count_abrep == count_fechap && !doublearrowexist && !arrowexist) //verifica se o simbolo é valido
						{
							pos = i;
							orexist = true;
						}
					}
					else if(termo[i] == '^')
					{
						if(count_abrep == count_fechap && !doublearrowexist && !arrowexist && !orexist) //verifica se o simbolo é valido
						{
							pos = i;
						}				
					}
					
				}
			}

			var sinal = termo[pos];

			if(sinal == '^')
			{
				var texto2 = "";
				
				for(var i = 0; i < termo.length; i++)
				{
					if(i == pos)
					{
						texto2 = texto2 + "=";
					}
					else
					{
						texto2 = texto2 + termo[i];
					}	
				}
				termo = texto2;	

				termos = termo.split('=');

				termos[0] = remove_p(termos[0]);
				termos[1] = remove_p(termos[1]);

				var modo = " ^E";

				var tipo = 'normal';
				var linha_selecionada = "";
				for(var i = 0; i < linhas.length; i++)
				{
					if(linhas[i].classList.value == "selecionado")
					{
						linha_selecionada = linha_selecionada + (i + 1) + ', ';
					}
					if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-pc')
					{
						tipo = 'hipotese-pc';
					}
					else if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-raa')
					{
						tipo = 'hipotese-raa';
					}
				}
				linha_selecionada = linha_selecionada.slice(0, -2);
				modo = linha_selecionada + modo;

				//Elemento 1
				var choice_tabela = document.getElementById('choice-table-dashboard');
		        var numeroLinhas = choice_tabela.rows.length;
		        var choice_linha = choice_tabela.insertRow(numeroLinhas);
		        var celula1 = choice_linha.insertCell(0);
		        var celula2 = choice_linha.insertCell(1);
		        var celula3 = choice_linha.insertCell(2);
		        celula1.innerHTML = "1.";   
		        celula2.innerHTML = fix(termos[0]);
		        celula3.innerHTML =  modo;
		        choice_linhas[numeroLinhas].addEventListener("dblclick", function(){
		        	doubleclick(this, modo, tipo);
		        });
		        //Elemento 2
		        numeroLinhas = choice_tabela.rows.length;
		        choice_linha = choice_tabela.insertRow(numeroLinhas);
		        celula1 = choice_linha.insertCell(0);
		        celula2 = choice_linha.insertCell(1);
		        celula3 = choice_linha.insertCell(2);
		        celula1.innerHTML = "2.";
		        celula2.innerHTML = fix(termos[1]);
		        celula3.innerHTML =  modo;
		        choice_linhas[numeroLinhas].addEventListener("dblclick", function(){
		        	doubleclick(this, modo, tipo);
		        });
		        //limpa o campo
		       	textbox.value = "";
		       	clean_row();
			}
			else
			{
				alert("A operação deve conter um operador '^' principal");
			}
		}
		else
		{
			alert("Selecione exatamente 1 linha!");
		}
	}
	function exclusao_ou(){
		var selecionados = tabela.getElementsByClassName("selecionado");

		if(selecionados.length == 3)
		{
			var element1 = remove_graus(selecionados[0].cells[1].textContent);
			var element2 = remove_graus(selecionados[1].cells[1].textContent);
			var element3 = remove_graus(selecionados[2].cells[1].textContent);

			if(verifica_principal(element1) == 'v')
			{
				var main = element1;
				var element1 = element2;
				var element2 = element3;
			}
			else if(verifica_principal(element2) == 'v')
			{
				var main = element2;
				var element1 = element1;
				var element2 = element3;
			}
			else if(verifica_principal(element3) == 'v')
			{
				var main = element3;
				var element1 = element1;
				var element2 = element2;
			}

			if(verifica_principal(element1) == '→' && verifica_principal(element2) == '→')
			{
				verifica_principal(element1);
				element1 = texto_formatado;
				verifica_principal(element2);
				element2 = texto_formatado;

				var termos1 = element1.split('=');
				var termos2 = element2.split('=');

				element1 = remove_p(fix(termos1[1]));
				element2 = remove_p(fix(termos2[1]));

				if(element1 == element2)
				{
					element1 = remove_p(fix(termos1[0]));
					element2 = remove_p(fix(termos2[0]));

					verifica_principal(main);
					main = texto_formatado;

					var termos_main = main.split('=');

					var main1 = remove_p(fix(termos_main[0]));
					var main2 = remove_p(fix(termos_main[1])); 

					if((main1 == element1 && main2 == element2) || (main1 == element2 && main2 == element1))
					{
						var modo = ' vE';
						var linha_selecionada = "";
						var tipo = 'normal';
						for(var i = 0; i < linhas.length; i++)
						{
							if(linhas[i].classList.value == "selecionado")
							{
								linha_selecionada = linha_selecionada + (i + 1) + ', ';
							}
							if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-pc')
							{
								tipo = 'hipotese-pc';
							}
							else if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-raa')
							{
								tipo = 'hipotese-raa';
							}
						}
						var result = remove_p(fix(termos1[1]));
						linha_selecionada = linha_selecionada.slice(0, -2);
						modo = linha_selecionada + modo;
						if(tipo == 'hipotese-pc')
						{
							adiciona_hipotese(modo, result, tipo);
						}
						else if(tipo == 'hipotese-raa')
						{
							adiciona_hipotese(modo, result, tipo);
						}
						else if(tipo == 'normal')
						{
							adiciona_tr(modo, result);
						}
						
						clean_row();
					}
					else
					{
						alert('Os elementos não conferem');
					}
				}
				else
				{
					alert('As linhas precisam inferir uma mesma expressão!');
				}
			}
			else
			{
				alert('Selecione as linhas certas!');
			}
		}
		else
		{
			alert("Selecione exatamente 3 linhas!");
		}
	}
	function modus_ponens(){
		var selecionados = tabela.getElementsByClassName("selecionado");

		if(selecionados.length == 2)
		{
			var element1 = remove_graus(selecionados[0].cells[1].textContent);
			var element2 = remove_graus(selecionados[1].cells[1].textContent);

			if(verifica_principal(element1) == '→' && verifica_principal(element2) == '→')
			{
				tam1 = element1.length - (element1.split('(').length -1) - (element1.split(')').length -1) - (element1.split('¬').length -1) - (element1.split(' ').length -1);
				tam2 = element2.length - (element2.split('(').length -1) - (element2.split(')').length -1) - (element2.split('¬').length -1) - (element2.split(' ').length -1);

				if(tam1 > tam2)
				{
					var main = element1;
					element1 = element2;
				}
				else if(tam2 > tam1)
				{
					var main = element2;
				}
				else
				{
					alert('Selecione linhas válidas!');
				}
			}
			else if(verifica_principal(element1) == '→')
			{
				var main = element1;
				element1 = element2;
			}
			else if(verifica_principal(element2) == '→')
			{
				var main = element2;
			}
			else
			{
				alert('Selecione pelo menos uma linha com inferências')
			}

			verifica_principal(main);
			main = texto_formatado;

			termos = main.split('=');

			main = remove_p(fix(termos[0]));

			if(main == element1)
			{
				var modo = ' MP';
				var result = remove_p(fix(termos[1]));
				var tipo = 'normal';
				var linha_selecionada = "";
				for(var i = 0; i < linhas.length; i++)
				{
					if(linhas[i].classList.value == "selecionado")
					{
						linha_selecionada = linha_selecionada + (i + 1) + ', ';
					}
					if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-pc')
					{
						tipo = 'hipotese-pc';
					}
					else if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-raa')
					{
						tipo = 'hipotese-raa';
					}
				}
				linha_selecionada = linha_selecionada.slice(0, -2);
				modo = linha_selecionada + modo;

				if(tipo == 'hipotese-pc')
				{
					adiciona_hipotese(modo, result, tipo);
				}
				else if(tipo == 'hipotese-raa')
				{
					adiciona_hipotese(modo, result, tipo);
				}
				else if(tipo == 'normal')
				{
					adiciona_tr(modo, result);
				}
				
				clean_row();

			}
			else
			{
				alert('Selecione linhas válidas!');
			}

		}
		else
		{
			alert('Selecione exatamente 2 linhas');
		}
	}
	function exclusao_notnot(){
		var selecionado = tabela.getElementsByClassName("selecionado");

		if(selecionado.length == 1)
		{
			var content = remove_graus(selecionado[0].cells[1].textContent);

			if(content[0] == '¬' && content[1] == '¬')
			{
				content = content.replace(/^¬/,"");
				content = content.replace(/^¬/,"");
				var endneg = false;
				var contneg = 0;
				for(var i = 0; i < content.length; i++)
				{
					if(content[i] == '¬' && endneg == false)
					{
						contneg++;
						content = content.replace(/^¬/,"");
						i--;
					}
					else if(content[i] != '¬')
					{
						endneg = true;
					}
				}

				var real_length = content.length - (content.split('(').length -1) - (content.split(')').length -1) - (content.split('¬').length -1) - (content.split(' ').length -1);

				if(real_length >= 3 || real_length == 1)
				{
					if(content[0] == '(')
					{
						var conta_par = 1;
						var tem_fora = false;
						var contain_p = false;
						for(var i = 1; i < content.length; i++) 
						{
							if(content[i] == '(') // se tiver abertuda soma +1
							{
								conta_par++;
							}
							else if(content[i] == ')') // se tiver fechamento, diminui -1
							{
								conta_par--;
							}

							if(conta_par == 0) //quando chegar a 0, significa que o primeiro parenteses fechou
							{
								conta_par++;
								if(i == (content.length -1)) //se está no ultimo i
								{
									contain_p = true;
								}
								else
								{
									contain_p = false;
								}
							}
						}	
					}

					if(contain_p || real_length == 1)
					{
						if(contneg != 0)
						{
							for(var j = 0; j < contneg; j++)
							{
								content = '¬' + content;
							}
						}
						else
						{
							content = remove_p(fix(content));
						}

						var tipo = 'normal';
						var linha_selecionada;
						for(var i = 0; i < linhas.length; i++)
						{
							if(linhas[i].classList.value == "selecionado")
							{
								linha_selecionada = i + 1;
							}
							if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-pc')
							{
								tipo = 'hipotese-pc';
							}
							else if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-raa')
							{
								tipo = 'hipotese-raa';
							}
						}

						var modo = linha_selecionada + " ~~E";

						if(tipo == 'hipotese-pc')
						{
							adiciona_hipotese(modo, content, tipo);
						}
						else if(tipo == 'hipotese-raa')
						{
							adiciona_hipotese(modo, content, tipo);
						}
						else if(tipo == 'normal')
						{
							adiciona_tr(modo, content);
						}
						
						clean_row();
					}
					else
					{
						alert('Selecione uma linha válida!');
					}
				}
			}
			else
			{
				alert('Selecione uma linha válida que contenha dupla negação!');
			}
		}
		else
		{
			alert('Selecione exatamente 1 linha');
		}
	}
	function inclusao_notnot(){
		var selecionado = tabela.getElementsByClassName("selecionado");

		if(selecionado.length == 1)
		{
			var content = remove_graus(selecionado[0].cells[1].textContent);

			var real_length = content.length - (content.split('(').length -1) - (content.split(')').length -1) - (content.split('¬').length -1) - (content.split(' ').length -1);

			if(real_length == 1)
			{
				content = "¬¬" + content;
			}
			else if(real_length >= 3)
			{
				var endneg = false;
				var contneg = 0;
				for(var i = 0; i < content.length; i++)
				{
					if(content[i] == '¬' && endneg == false)
					{
						contneg++;
						content = content.replace(/^¬/,"");
						i--;
					}
					else if(content[i] != '¬')
					{
						endneg = true;
					}
				}

				if(contneg == 0)
				{
					content = '¬¬' + add_p(fix(content));
				}
				else
				{
					var conta_par = 1;
					var tem_fora = false;
					var contain_p = false;
					for(var i = 1; i < content.length; i++) 
					{
						if(content[i] == '(') // se tiver abertuda soma +1
						{
							conta_par++;
						}
						else if(content[i] == ')') // se tiver fechamento, diminui -1
						{
							conta_par--;
						}

						if(conta_par == 0) //quando chegar a 0, significa que o primeiro parenteses fechou
						{
							conta_par++;
							if(i == (content.length -1)) //se está no ultimo i
							{
								contain_p = true;
							}
							else
							{
								contain_p = false;
							}
						}
					}

					for(var j = 0; j < contneg; j++)
					{
						content = '¬' + content;
					}

					if(contain_p)
					{
						content = '¬¬' + content;
					}
					else
					{
						content = '¬¬' + '(' + content + ')';
					}
				}
			}

			var tipo = 'normal';
			var linha_selecionada;
			for(var i = 0; i < linhas.length; i++)
			{
				if(linhas[i].classList.value == "selecionado")
				{
					linha_selecionada = i + 1;
				}
				if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-pc')
				{
					tipo = 'hipotese-pc';
				}
				else if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-raa')
				{
					tipo = 'hipotese-raa';
				}
			}

			var modo = linha_selecionada + " ~~I";

			if(tipo == 'hipotese-pc')
			{
				adiciona_hipotese(modo, content, tipo);
			}
			else if(tipo == 'hipotese-raa')
			{
				adiciona_hipotese(modo, content, tipo);
			}
			else if(tipo == 'normal')
			{
				adiciona_tr(modo, content);
			}
			
			clean_row();

		}
		else
		{
			alert('Selecione exatamente 1 linha');
		}
	}
	function inclusao_sse(){
		var selecionado = tabela.getElementsByClassName("selecionado");

		if(selecionado.length == 1)
		{
			var content = remove_graus(selecionado[0].cells[1].textContent);

			var real_length = content.length - (content.split('(').length -1) - (content.split(')').length -1) - (content.split('¬').length -1) - (content.split(' ').length -1);

			if(verifica_principal(content) == '^')
			{
				termos = texto_formatado.split('=');

				termo1 = remove_p(fix(termos[0]));
				termo2 = remove_p(fix(termos[1]));

				if((verifica_principal(termo1) == '→') && (verifica_principal(termo2) == '→'))
				{
					verifica_principal(termo1);
					termo1 = texto_formatado;
					verifica_principal(termo2);
					termo2 = texto_formatado;

					termos1 = termo1.split('=');
					termos2 = termo2.split('=');

					content1 = remove_p(fix(termos1[0]));
					content2 = remove_p(fix(termos1[1]));
					content3 = remove_p(fix(termos2[0]));
					content4 = remove_p(fix(termos2[1]));

					if((content1 == content4) && (content2 == content3))
					{
						var tipo = 'normal';
						var linha_selecionada = "";
						for(var i = 0; i < linhas.length; i++)
						{
							if(linhas[i].classList.value == "selecionado")
							{
								linha_selecionada = i + 1;
							}
							if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-pc')
							{
								tipo = 'hipotese-pc';
							}
							else if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-raa')
							{
								tipo = 'hipotese-raa';
							}
						}

						var modo = linha_selecionada + " ↔I";
						//Elemento 1
						var choice_tabela = document.getElementById('choice-table-dashboard');
				        var numeroLinhas = choice_tabela.rows.length;
				        var choice_linha = choice_tabela.insertRow(numeroLinhas);
				        var celula1 = choice_linha.insertCell(0);
				        var celula2 = choice_linha.insertCell(1);
				        var celula3 = choice_linha.insertCell(2);
				        celula1.innerHTML = "1.";   
				        celula2.innerHTML = content1 + ' ↔ ' + content2;
				        celula3.innerHTML =  modo;
				        choice_linhas[numeroLinhas].addEventListener("dblclick", function(){
				        	doubleclick(this, modo, tipo);
				        });
				        //Elemento 2
				        numeroLinhas = choice_tabela.rows.length;
				        choice_linha = choice_tabela.insertRow(numeroLinhas);
				        celula1 = choice_linha.insertCell(0);
				        celula2 = choice_linha.insertCell(1);
				        celula3 = choice_linha.insertCell(2);
				        celula1.innerHTML = "2.";
				        celula2.innerHTML = content2 + ' ↔ ' + content1;
				        celula3.innerHTML =  modo;
				        choice_linhas[numeroLinhas].addEventListener("dblclick", function(){
				        	doubleclick(this, modo, tipo);
				        });
				        //limpa o campo
				       	textbox.value = "";

						
						clean_row();
					}
					else
					{
						alert('Selecione uma linha válida');
					}
				}
				else
				{
					alert('Selecione uma linha válida');
				}
			}
			else
			{
				alert('Selecione uma linha válida!')
			}
		}
		else
		{
			alert('Selecione exatamente 1 linha');
		}
	}
	function exclusao_sse(){
		var selecionado = tabela.getElementsByClassName("selecionado");

		if(selecionado.length == 1)
		{
			var content = remove_graus(selecionado[0].cells[1].textContent);

			var real_length = content.length - (content.split('(').length -1) - (content.split(')').length -1) - (content.split('¬').length -1) - (content.split(' ').length -1);

			if(verifica_principal(content) == '↔')
			{
				termos = texto_formatado.split('=');

				termo1 = fix(termos[0]);
				termo2 = fix(termos[1]);

				var tipo = 'normal';
				var linha_selecionada;
				for(var i = 0; i < linhas.length; i++)
				{
					if(linhas[i].classList.value == "selecionado")
					{
						linha_selecionada = i + 1;
					}
					if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-pc')
					{
						tipo = 'hipotese-pc';
					}
					else if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-raa')
					{
						tipo = 'hipotese-raa';
					}
				}

				var modo = linha_selecionada + " ↔I";
				//Elemento 1
				var choice_tabela = document.getElementById('choice-table-dashboard');
		        var numeroLinhas = choice_tabela.rows.length;
		        var choice_linha = choice_tabela.insertRow(numeroLinhas);
		        var celula1 = choice_linha.insertCell(0);
		        var celula2 = choice_linha.insertCell(1);
		        var celula3 = choice_linha.insertCell(2);
		        celula1.innerHTML = "1.";   
		        celula2.innerHTML = '(' + termo1 + ' → ' + termo2 + ') ^ (' + termo2 + ' → ' + termo1 + ')' ;
		        celula3.innerHTML =  modo;
		        choice_linhas[numeroLinhas].addEventListener("dblclick", function(){
		        	doubleclick(this, modo, tipo);
		        });
		        //Elemento 2
		        numeroLinhas = choice_tabela.rows.length;
		        choice_linha = choice_tabela.insertRow(numeroLinhas);
		        celula1 = choice_linha.insertCell(0);
		        celula2 = choice_linha.insertCell(1);
		        celula3 = choice_linha.insertCell(2);
		        celula1.innerHTML = "2.";
		        celula2.innerHTML = '(' + termo2 + ' → ' + termo1 + ') ^ (' + termo1 + ' → ' + termo2 + ')' ;
		        celula3.innerHTML =  modo;
		        choice_linhas[numeroLinhas].addEventListener("dblclick", function(){
		        	doubleclick(this, modo, tipo);
		        });
		        //limpa o campo
		       	textbox.value = "";

				
				clean_row();
			}
			else
			{
				alert('Selecione uma linha válida!')
			}
		}
		else
		{
			alert('Selecione exatamente 1 linha');
		}
	}
	function modus_tollens(){

		var selecionados = tabela.getElementsByClassName("selecionado");

		if(selecionados.length == 2)
		{
			var element1 = remove_graus(selecionados[0].cells[1].textContent);
			var element2 = remove_graus(selecionados[1].cells[1].textContent);

			if(verifica_principal(element1) == '→' && verifica_principal(element2) == '→')
			{
				tam1 = element1.length - (element1.split('(').length -1) - (element1.split(')').length -1) - (element1.split('¬').length -1) - (element1.split(' ').length -1);
				tam2 = element2.length - (element2.split('(').length -1) - (element2.split(')').length -1) - (element2.split('¬').length -1) - (element2.split(' ').length -1);

				if(tam1 > tam2)
				{
					var main = element1;
					element1 = element2;
				}
				else if(tam2 > tam1)
				{
					var main = element2;
				}
				else
				{
					alert('Selecione linhas válidas!');
				}
			}
			else if(verifica_principal(element1) == '→')
			{
				var main = element1;
				element1 = element2;
			}
			else if(verifica_principal(element2) == '→')
			{
				var main = element2;
			}
			else
			{
				alert('Selecione pelo menos uma linha com inferências')
			}

			verifica_principal(main);
			main = texto_formatado;

			termos = main.split('=');

			termos1 = fix(termos[0]);
			termos2 = fix(termos[1]);

			termos2 = '¬' + termos2;

			if(termos2 == element1)
			{

				var result = '¬' + termos1;

				var modo = " MT";

				var tipo = 'normal';
				var linha_selecionada = "";
				for(var i = 0; i < linhas.length; i++)
				{
					if(linhas[i].classList.value == "selecionado")
					{
						linha_selecionada = linha_selecionada + (i + 1) + ', ';
					}
					if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-pc')
					{
						tipo = 'hipotese-pc';
					}
					else if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-raa')
					{
						tipo = 'hipotese-raa';
					}
				}
				linha_selecionada = linha_selecionada.slice(0, -2);
				modo = linha_selecionada + modo;

				if(tipo == 'hipotese-pc')
				{
					adiciona_hipotese(modo, result, tipo);
				}
				else if(tipo == 'hipotese-raa')
				{
					adiciona_hipotese(modo, result, tipo);
				}
				else if(tipo == 'normal')
				{
					adiciona_tr(modo, result);
				}

				clean_row();
			}
			else
			{
				alert('Selecione linhas válidas')
			}

		}
		else
		{
			alert('Selecione exatamente 2 linhas');
		}
	}
	function silogismo_disjuntivo(){

		var selecionados = tabela.getElementsByClassName("selecionado");

		if(selecionados.length == 2)
		{
			var element1 = remove_graus(selecionados[0].cells[1].textContent);
			var element2 = remove_graus(selecionados[1].cells[1].textContent);

			if(verifica_principal(element1) == 'v' || verifica_principal(element2) == 'v')
			{
				tam1 = element1.length - (element1.split('(').length -1) - (element1.split(')').length -1) - (element1.split('¬').length -1) - (element1.split(' ').length -1);
				tam2 = element2.length - (element2.split('(').length -1) - (element2.split(')').length -1) - (element2.split('¬').length -1) - (element2.split(' ').length -1);

				if(tam1 > tam2)
				{
					var main = element1;
					element1 = element2;
				}
				else if(tam2 > tam1)
				{
					var main = element2;
				}
				else
				{
					alert('Selecione linhas válidas!');
				}
			}
			else if(verifica_principal(element1) == 'v')
			{
				var main = element1;
				element1 = element2;
			}
			else if(verifica_principal(element2) == 'v')
			{
				var main = element2;
			}
			else
			{
				alert('Selecione pelo menos uma linha com inferências')
			}

			verifica_principal(main);
			main = texto_formatado;

			termos = main.split('=');

			part1 = fix(termos[0]);
			part2 = fix(termos[1]);

			termos1 = '¬' + part1;
			termos2 = '¬' + part2;

			if(termos2 == element1)
			{
				var result = remove_p(part1);

				var modo = " DS";

				var tipo = 'normal';
				var linha_selecionada = "";
				for(var i = 0; i < linhas.length; i++)
				{
					if(linhas[i].classList.value == "selecionado")
					{
						linha_selecionada = linha_selecionada + (i + 1) + ', ';
					}
					if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-pc')
					{
						tipo = 'hipotese-pc';
					}
					else if(i == linhas.length -1 && tipo_linha[i + 1] == 'hipotese-raa')
					{
						tipo = 'hipotese-raa';
					}
				}
				linha_selecionada = linha_selecionada.slice(0, -2);
				modo = linha_selecionada + modo;

				if(tipo == 'hipotese-pc')
				{
					adiciona_hipotese(modo, result, tipo);
				}
				else if(tipo == 'hipotese-raa')
				{
					adiciona_hipotese(modo, result, tipo);
				}
				else if(tipo == 'normal')
				{
					adiciona_tr(modo, result);
				}

				clean_row();
			}
			else if(termos1 == element1)
			{
				var result = remove_p(part2);

				var modo = " DS";

				var linha_selecionada = "";
				for(var i = 0; i < linhas.length; i++)
				{
					if(linhas[i].classList.value == "selecionado")
					{
						linha_selecionada = linha_selecionada + (i + 1) + ', ';
					}
				}
				linha_selecionada = linha_selecionada.slice(0, -2);
				modo = linha_selecionada + modo;

				if(tipo == 'hipotese-pc')
				{
					adiciona_hipotese(modo, result, tipo);
				}
				else if(tipo == 'hipotese-raa')
				{
					adiciona_hipotese(modo, result, tipo);
				}
				else if(tipo == 'normal')
				{
					adiciona_tr(modo, result);
				}

				clean_row();
			}
			else
			{
				alert('Selecione linhas válidas')
			}

		}
		else
		{
			alert('Selecione exatamente 2 linhas');
		}
	}
	function inclusao_se(){
		var selecionados = tabela.getElementsByClassName("selecionado");

		if(selecionados.length == 2)
		{
			var element1 = remove_graus(selecionados[0].cells[1].textContent);
			var element2 = remove_graus(selecionados[1].cells[1].textContent);

			if(grau > 0)
			{
				var is_element1_valid = false;
				var is_element2_valid = false;
				var linha_element1 = -1;
				var linha_element2 = -1;

				for(var i = 0; i < linhas.length; i++)
				{
					if(linhas[i].classList.value == "selecionado") //testa se a linha é selecionada
					{
						if(tipo_linha[i + 1] == 'hipotese-pc')    //testa se a linha selecionada se trata de uma hipotese pc
						{
							var tam_grau = 0;
							for(var j = 0; j < linhas[i].textContent.length; j = j + 2)
							{
								if(linhas[i].textContent[j] == '|')
								{
									tam_grau++;
								}
							}

							if(linha_inicio_grau[grau] == i + 1) // testa se uma das linhas selecionadas é a primeira da hipotese
							{
								is_element1_valid = true;
								linha_element1 = i + 1;
							}
							else if(tam_grau == grau) // testa se uma das linhas selecionadas esta no grau atual
							{
								is_element2_valid = true;
								linha_element2 = i + 1;
							}
						}
					}
				}

				if(is_element1_valid && is_element2_valid)
				{
					var result = add_p(fix(element1)) + ' → ' + add_p(fix(element2));
					var modo = linha_element1 + '-' + linha_element2 + ' →I';

					//configura o can use da hipotese que vai fechar
					for(var i = 0; i < linhas.length; i++)
					{
						if(linha_inicio_grau[grau] == i + 1)
						{
							var inicio = i + 1;

							for(var j = inicio; j < linha_grau.length; j++)
							{
								can_use[j] = false;
							}
						}
					}

					grau--;
					var tipo = tipo_linha[linha_inicio_grau[grau - 1]];

					if((grau + 1) > 1)
					{
						adiciona_hipotese(modo, result, tipo);
					}
					else
					{
						adiciona_tr(modo, result);
					}

					clean_row();
				}
				else
				{
					alert('Selecione linhas válidas!');
				}
			}
			else
			{
				alert('É impossível fazer está ação sem hipótese para PC')
			}
		}
		else
		{
			alert('Selecione exatamente 2 linhas');
		}
	}
	function inclusao_not(){
		var selecionados = tabela.getElementsByClassName("selecionado");

		if(selecionados.length == 2)
		{
			var element1 = remove_graus(selecionados[0].cells[1].textContent);
			var element2 = remove_graus(selecionados[1].cells[1].textContent);

			if(grau > 0 && tipo_linha[(selecionados[0].rowIndex) + 1] == 'hipotese-raa')
			{
				if(linha_inicio_grau[grau] == (selecionados[0].rowIndex + 1))
				{
					if(verifica_principal(element2) == '^')
					{
						element2 = texto_formatado;
						termos = element2.split('=');;
						termos1 = fix(termos[0]);
						termos2 = fix(termos[1]);

						if(termos1[0] == '¬' || termos2[0] == '¬')
						{
							if(termos1[0] == '¬' && termos2[0] == '¬')
							{
								var start = true;
								var counter1 = 0;
								for(var i = 0; i < termos1.length; i++)
								{
									if(termos1[i] == '¬' && start)
									{
										counter1++;
									}
									else
									{
										start = false;
									}
								}
								var start = true;
								var counter2 = 0;
								for(var i = 0; i < termos2.length; i++)
								{
									if(termos2[i] == '¬' && start)
									{
										counter2++;
									}
									else
									{
										start = false;
									}
								}

								if(counter1 > counter2)
								{
									termos2 = '¬' + termos2;
								}
								else if(counter2 > counter1)
								{
									termos1 = '¬' + termos1;
								}
							}
							else if(termos1[0] == '¬')
							{
								termos2 = '¬' + termos2;
							}
							else if(termos2[0] == '¬')
							{
								termos1 = '¬' + termos1;
							}

							if(termos1 == termos2)
							{
								var result = '¬' + add_p(element1);
								var modo = linha_inicio_grau[grau] + '-' + (selecionados[1].rowIndex +1) + ' ¬I';

								//configura o can use da hipotese que vai fechar
								for(var i = 0; i < linhas.length; i++)
								{
									if(linha_inicio_grau[grau] == i + 1)
									{
										var inicio = i + 1;

										for(var j = inicio; j < linha_grau.length; j++)
										{
											can_use[j] = false;
										}
									}
								}

								grau--;
								var tipo = tipo_linha[linha_inicio_grau[grau]];

								if((grau + 1) > 1)
								{
									adiciona_hipotese(modo, result, tipo);
								}
								else
								{
									adiciona_tr(modo, result);
								}

								clean_row();
							}
							else
							{
								alert('É necessário ter linhas válidas e uma hipotese RAA para executar esta ação');
							}
						}		
						else
						{
							alert('É necessário ter linhas válidas e uma hipotese RAA para executar esta ação');
						}
					}
					else
					{
						alert('É necessário uma oposição dentro da hipótese')
					}
				}
			}
			else
			{
				alert('É necessário ter linhas válidas e uma hipotese RAA para executar esta ação');
			}
		}
		else
		{
			alert('Selecione exatamente 2 linhas');
		}
	}
	function exclusao_not(){
		var selecionados = tabela.getElementsByClassName("selecionado");

		if(selecionados.length == 2)
		{
			var element1 = remove_graus(selecionados[0].cells[1].textContent);
			var element2 = remove_graus(selecionados[1].cells[1].textContent);

			if((grau > 0 && tipo_linha[(selecionados[0].rowIndex) + 1] == 'hipotese-raa') && element1[0] == '¬')
			{
				if(linha_inicio_grau[grau] == (selecionados[0].rowIndex + 1))
				{
					if(verifica_principal(element2) == '^')
					{
						element2 = texto_formatado;
						termos = element2.split('=');;
						termos1 = fix(termos[0]);
						termos2 = fix(termos[1]);

						if(termos1[0] == '¬' || termos2[0] == '¬')
						{
							if(termos1[0] == '¬' && termos2[0] == '¬')
							{
								var start = true;
								var counter1 = 0;
								for(var i = 0; i < termos1.length; i++)
								{
									if(termos1[i] == '¬' && start)
									{
										counter1++;
									}
									else
									{
										start = false;
									}
								}
								var start = true;
								var counter2 = 0;
								for(var i = 0; i < termos2.length; i++)
								{
									if(termos2[i] == '¬' && start)
									{
										counter2++;
									}
									else
									{
										start = false;
									}
								}

								if(counter1 > counter2)
								{
									termos2 = '¬' + termos2;
								}
								else if(counter2 > counter1)
								{
									termos1 = '¬' + termos1;
								}
							}
							else if(termos1[0] == '¬')
							{
								termos2 = '¬' + termos2;
							}
							else if(termos2[0] == '¬')
							{
								termos1 = '¬' + termos1;
							}

							if(termos1 == termos2)
							{
								var result = element1.replace(/^¬/, "");
								result = remove_p(result);
								var modo = linha_inicio_grau[grau] + '-' + (selecionados[1].rowIndex +1) + ' ¬E';

								//configura o can use da hipotese que vai fechar
								for(var i = 0; i < linhas.length; i++)
								{
									if(linha_inicio_grau[grau] == i + 1)
									{
										var inicio = i + 1;

										for(var j = inicio; j < linha_grau.length; j++)
										{
											can_use[j] = false;
										}
									}
								}

								grau--;
								var tipo = tipo_linha[linha_inicio_grau[grau]];

								if((grau + 1) > 1)
								{
									adiciona_hipotese(modo, result, tipo);
								}
								else
								{
									adiciona_tr(modo, result);
								}

								clean_row();
							}
							else
							{
								alert('É necessário ter linhas válidas e uma hipotese RAA para executar esta ação');
							}
						}		
						else
						{
							alert('É necessário ter linhas válidas e uma hipotese RAA para executar esta ação');
						}
					}
					else
					{
						alert('É necessário uma oposição dentro da hipótese')
					}
				}
			}
			else
			{
				alert('É necessário ter linhas válidas e uma hipotese RAA para executar esta ação');
			}
		}
		else
		{
			alert('Selecione exatamente 2 linhas');
		}
	}
	function hipotese_pc(){
		var modo = "H PC";
		var info = valida_entrada(textbox.value);
		var tipo = 'hipotese-pc';
		if(info != false && info != undefined)
		{
			info = fix(info);
		}
		grau++;
		linha_inicio_grau[grau] = num_linha;
		adiciona_hipotese(modo, info, tipo, null, true);
	}
	function hipotese_raa(){
		var modo = "H RAA";
		var info = valida_entrada(textbox.value);
		var tipo = 'hipotese-raa';
		if(info != false && info != undefined)
		{
			info = fix(info);
		}
		grau++;
		linha_inicio_grau[grau] = num_linha;
		adiciona_hipotese(modo, info, tipo, null, true);
	}
	function adiciona_tr(modo, info, old_info = null, need_value = null){
		if((need_value && !textbox.value == "") || !need_value)
		{
			if(info == false)
			{
				return false;
			}
			if(old_info == false)
			{
				return false;
			}
			var tabela = document.getElementById('table-dashboard');
	        var numeroLinhas = tabela.rows.length;
	        var linha = tabela.insertRow(numeroLinhas);
	        var celula1 = linha.insertCell(0);
	        var celula2 = linha.insertCell(1);
	        var celula3 = linha.insertCell(2);
	        celula1.innerHTML = num_linha++ + ".";   
	        celula2.innerHTML = info;
	        celula3.innerHTML =  modo;
	        textbox.value = "";
	        linhas[numeroLinhas].addEventListener("click", function(){
	        	selLinha(this);
	        });
	        tipo_linha[tabela.rows.length] = 'normal';
	        linha_grau[tabela.rows.length] = 0;
	        can_use[tabela.rows.length] = true;
		}	
	}
	function adiciona_hipotese(modo, info, tipo, old_info = null, need_value = null){
		if((need_value && !textbox.value == "") || !need_value)
		{
			if(info == false)
			{
				return false;
			}
			if(old_info == false)
			{
				return false;
			}
			var texto = '&nbsp';
			for(var i = 0; i < grau; i++)
			{
				texto = '| ' + texto;
			}

			var tabela = document.getElementById('table-dashboard');
	        var numeroLinhas = tabela.rows.length;
	        var linha = tabela.insertRow(numeroLinhas);
	        var celula1 = linha.insertCell(0);
	        var celula2 = linha.insertCell(1);
	        var celula3 = linha.insertCell(2);
	        celula1.innerHTML = num_linha++ + ".";   
	        celula2.innerHTML = texto + info;
	        celula3.innerHTML =  modo;
	        textbox.value = "";
	        linhas[numeroLinhas].addEventListener("click", function(){
	        	selLinha(this);
	        });
	        if(tipo == 'hipotese-pc')
	        {
	        	tipo_linha[tabela.rows.length] = 'hipotese-pc';
	        }
	        else if(tipo == 'hipotese-raa')
	        {
	        	tipo_linha[tabela.rows.length] = 'hipotese-raa';
	        }
	        linha_grau[tabela.rows.length] = grau;
	        can_use[tabela.rows.length] = true;
	        
		}
	}
	/**
	Função que remove linhas da tabela (undo)
	**/
	function remover_tr(){
		if(tabela.rows.length)
		{
			linhas[tabela.rows.length - 1].remove();

			numeroLinhasChoice = choice_tabela.rows.length;
			for(var i = 0; i < numeroLinhasChoice; i++)
			{
				choice_linhas[0].remove();
			}

			num_linha--;
			if(tipo_linha.length > 1)
			{
				tipo_linha.pop();
			}
			if(linha_grau.length > 1)
			{
				linha_grau.pop();
			}
			if(can_use.length > 1)
			{
				can_use.pop();
			}

			//caso ela volta para uma hipotese novamente, o can_use delas fica como true
			if(can_use[tabela.rows.length] == false)
			{
				var inicio = tabela.rows.length;
				var final = 0;
				var used_one_time = false;

				for(var i = inicio; i > final; i--)
				{
					if(!can_use[i] && !used_one_time)
					{
						can_use[i] = true;
					}
					else
					{
						used_one_time = true;
					}
				}
			}

			var tam_grau = 0;

			if(linhas.length == 0)
			{
				grau = 0;
			}
			else
			{
				for(var j = 0; j < linhas[tabela.rows.length - 1].textContent.length; j = j + 2)
				{
					if(linhas[tabela.rows.length - 1].textContent[j] == '|')
					{
						tam_grau++;
					}
				}
				
				if(linha_inicio_grau[grau] == num_linha)
				{
					linha_inicio_grau.pop();
					grau--;
				}
				else if(tam_grau != grau)
				{
					grau = tam_grau;
				}
			}
			
		}
	}

	/*
	* função que ao clicar em uma linha, seleciona ela ou deseleciona
	*/
	function selLinha(linha){
		if(linha.classList && can_use[linha.rowIndex + 1])
		{
			if(choice_tabela.rows.length <= 0)
			{
				linha.classList.toggle("selecionado");	
			}
			else
			{
				alert('Você deve selecionar uma das opções da segunda tabela');
			}
			
		}
		else
		{
			alert('Esta linha já foi descarregada!');
		}
	}
	function doubleclick(linha, modo, tipo){
		var content = linha.cells[1].textContent;
		if(tipo == 'hipotese-pc')
		{
			adiciona_hipotese(modo, content, tipo);
		}
		else if(tipo == 'hipotese-raa')
		{
			adiciona_hipotese(modo, content, tipo);
		}
		else if(tipo == 'normal')
		{
			adiciona_tr(modo, content);
		}

		while(choice_linhas.length) //enquanto tiver linhas na choice table
		{
			choice_linhas[0].remove();
		}
	}
	function fix(texto){
		texto = texto.replace(/\s/g, '');
		texto = texto.replace(/↔/g, " ↔ ");
		texto = texto.replace(/→/g, " → ");
		texto = texto.replace(/v/g, " v ");
		texto = texto.replace(/\^/g, " ^ ");

		return texto;
	}
	function clean_row(){
		numeroLinhas = tabela.rows.length;
		for(var i = 0; i < numeroLinhas; i++)
		{
			linhas[i].classList.remove("selecionado");
		}
	}

	function remove_p(texto){
		if((texto.length - ((texto.split('¬').length - 1) - (texto.split('(').length - 1) - (texto.split(')').length -1)) >= 3) && texto[0] != '¬')
		{
			texto = texto.replace(/^\(/, "");
			texto = texto.replace(/\)$/, "");
		}
		return texto;
	}

	function add_p(texto){
		var texto_alt = texto;
		var tem_fora = false;
		if(texto_alt[0] == '¬')
		{
			while(texto_alt[0] == '¬')
			{
				texto_alt = texto_alt.replace(/^¬/, "");
			}

			if(texto_alt[0] == '(') //Verifica se a expressão começa abrindo parenteses
			{
				var conta_par = 1;
				for(var i = 1; i < texto_alt.length; i++) 
				{
					if(texto_alt[i] == '(') // se tiver abertuda soma +1
					{
						conta_par++;
					}
					else if(texto_alt[i] == ')') // se tiver fechamento, diminui -1
					{
						conta_par--;
					}

					if(conta_par == 0) //quando chegar a 0, siginifica que o primeiro parenteses fechou
					{
						conta_par++;
						if(i == (texto_alt.length -1)) //se está no ultimo i
						{
							tem_fora = true;
						}
					}
				}
			}
		}

		if((texto.length - ((texto.split('¬').length - 1) - (texto.split('(').length - 1) - (texto.split(')').length -1)) >= 3) && (texto[0] != '¬' || !tem_fora))
		{
			texto = '(' + texto + ')';
		}
		return texto;
	}
	function verifica_principal(texto){

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

		gerar_new_string(texto, pos);

		return sinal;
	}

	function gerar_new_string(texto, pos)
	{
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
		texto_formatado = texto;
	}

	function remove_graus(texto)
	{
		if(texto[0] == '|')
		{
			var tam_grau = 0;
			for(var i = 0; i < texto.length; i = i + 2)
			{
				if(texto[i] == '|')
				{
					tam_grau++;
				}
			}
			for(var i = 0; i < tam_grau; i++)
			{
				texto = texto.slice(2);
			}
			texto = texto.slice(1);
		}
		return texto;
	}