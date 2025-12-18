import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Zap, Edit2, Save, X, FileText, Search, Pencil, FolderPlus, Trash, BarChart } from 'lucide-react';

export default function AutomationManager({ automations = [], onChange }) {
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({ keyword: '', action: '', description: '', type: 'create' });

  const handleAdd = () => {
    if (automations.length >= 15) {
      alert('Você atingiu o limite de 15 automações');
      return;
    }
    setEditing('new');
    setEditData({ keyword: '', action: '', description: '', type: 'create' });
  };

  const handleEdit = (index) => {
    setEditing(index);
    setEditData(automations[index]);
  };

  const handleSave = () => {
    if (!editData.keyword.trim() || !editData.action.trim()) {
      alert('Preencha a palavra-chave e a ação');
      return;
    }

    if (editing === 'new') {
      onChange([...automations, editData]);
    } else {
      const updated = [...automations];
      updated[editing] = editData;
      onChange(updated);
    }
    setEditing(null);
    setEditData({ keyword: '', action: '', description: '' });
  };

  const handleDelete = (index) => {
    if (confirm('Deseja excluir esta automação?')) {
      const updated = automations.filter((_, i) => i !== index);
      onChange(updated);
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setEditData({ keyword: '', action: '', description: '' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">
            {automations.length}/15 automações criadas
          </p>
        </div>
        <Button 
          onClick={handleAdd}
          disabled={automations.length >= 15}
          className="bg-purple-600 hover:bg-purple-700"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Automação
        </Button>
      </div>

      {editing !== null && (
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="pt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Tipo de Ação
              </label>
              <Select
                value={editData.type || 'create'}
                onValueChange={(value) => setEditData({ ...editData, type: value })}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="create">
                    <div className="flex items-center gap-2">
                      <FolderPlus className="w-4 h-4 text-green-600" />
                      <span>Criar - Novos arquivos/pastas</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="search">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-blue-600" />
                      <span>Pesquisar - Buscar informações</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="write">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span>Escrever - Redigir conteúdo</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="edit">
                    <div className="flex items-center gap-2">
                      <Pencil className="w-4 h-4 text-orange-600" />
                      <span>Editar - Modificar existentes</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="delete">
                    <div className="flex items-center gap-2">
                      <Trash className="w-4 h-4 text-red-600" />
                      <span>Deletar - Remover itens</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="analyze">
                    <div className="flex items-center gap-2">
                      <BarChart className="w-4 h-4 text-teal-600" />
                      <span>Analisar - Avaliar e revisar</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="response">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-600" />
                      <span>Resposta - Apenas responder</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                Escolha o tipo de ação para melhor processamento
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Palavra-chave
              </label>
              <Input
                value={editData.keyword}
                onChange={(e) => setEditData({ ...editData, keyword: e.target.value })}
                placeholder="Ex: criar tarefa de email"
                className="bg-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                O que você vai digitar no chat para ativar esta automação
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                {editData.type === 'response' ? 'Resposta' : 'Ação a executar'}
              </label>
              <Textarea
                value={editData.action}
                onChange={(e) => setEditData({ ...editData, action: e.target.value })}
                placeholder={
                  editData.type === 'response' 
                    ? 'Digite a resposta direta (ex: "Este é o número da sorte de Kratos")'
                    : editData.type === 'create'
                    ? 'Ex: Criar um kanban chamado "Tarefas Diárias" com 3 colunas'
                    : editData.type === 'search'
                    ? 'Ex: Buscar todos os documentos que contém a palavra "contrato"'
                    : editData.type === 'write'
                    ? 'Ex: Escrever um email profissional sobre reunião de vendas'
                    : editData.type === 'edit'
                    ? 'Ex: Editar o documento "Política" e adicionar seção de férias'
                    : editData.type === 'delete'
                    ? 'Ex: Excluir a pasta "Arquivos Antigos"'
                    : 'Ex: Analisar o kanban "Projetos" e dar insights sobre produtividade'
                }
                className="bg-white h-24"
              />
              <p className="text-xs text-gray-500 mt-1">
                {editData.type === 'response' 
                  ? '💬 Digite a resposta que será enviada ao usuário'
                  : '🤖 Descreva a ação que a assistente deve executar'
                }
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Descrição (opcional)
              </label>
              <Input
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                placeholder="Ex: Criar tarefa de verificar emails"
                className="bg-white"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button 
                size="sm"
                onClick={handleSave}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {automations.map((auto, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {auto.type === 'create' && <FolderPlus className="w-4 h-4 text-green-600" />}
                    {auto.type === 'search' && <Search className="w-4 h-4 text-blue-600" />}
                    {auto.type === 'write' && <FileText className="w-4 h-4 text-purple-600" />}
                    {auto.type === 'edit' && <Pencil className="w-4 h-4 text-orange-600" />}
                    {auto.type === 'delete' && <Trash className="w-4 h-4 text-red-600" />}
                    {auto.type === 'analyze' && <BarChart className="w-4 h-4 text-teal-600" />}
                    {auto.type === 'response' && <Zap className="w-4 h-4 text-yellow-600" />}
                    {!auto.type && <Zap className="w-4 h-4 text-purple-600" />}
                    <span className="font-medium text-gray-900">
                      "{auto.keyword}"
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {auto.action}
                  </p>
                  {auto.description && (
                    <p className="text-xs text-gray-500 italic">
                      {auto.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-1 ml-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEdit(index)}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {automations.length === 0 && editing === null && (
        <div className="text-center py-8 text-gray-400">
          <Zap className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Nenhuma automação criada ainda</p>
          <p className="text-xs mt-1">Clique em "Nova Automação" para começar</p>
        </div>
      )}
    </div>
  );
}