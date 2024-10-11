"use client";

import * as React from "react";

import {
  removeMascaraCep,
  removeMascaraDocumento,
  removeMascaraTelefone,
} from "@/common/utils/masks";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateClient } from "@/services/api/clients";
import { format, formatISO } from "date-fns";
import Modal from "./client-modal";
import { Cliente } from "./columns";
import { CreateClientForm, IClienteFormularioData } from "./create-client-form";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

interface ClienteTableProps {
  data: Cliente[];
  nextPage: () => void;
  previousPage: () => void;
  totalPages: number;
  fetchClients: () => void;
}

export function ClientesTable({
  data,
  nextPage,
  previousPage,
  totalPages,
  fetchClients,
}: ClienteTableProps) {
  const [filteredData, setFilteredData] = React.useState<Cliente[]>(data);
  const [filterValue, setFilterValue] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedClient, setSelectedClient] =
    React.useState<IClienteFormularioData>({} as IClienteFormularioData);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      nextPage();
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      previousPage();
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEditClick = (client: Cliente) => {
    var newSelectedClient = {
      uuid: client.uuid,
      nome: client.nome,
      cpfCnpj: client.documento,
      logradouro: client.endereco.logradouro,
      numero: client.endereco.numero,
      complemento: client.endereco.complemento,
      bairro: client.endereco.bairro,
      cidade: client.endereco.cidade,
      estado: client.endereco.estado,
      cep: client.endereco.cep,
      telefone: client.telefone ?? "",
      email: client.email,
    };

    var dataIso;

    if (client.dataNascimento) {
      const dataConvertida = format(client.dataNascimento, "yyyy/MM/dd");

      console.log(client.dataNascimento);
      dataIso = formatISO(dataConvertida);
    }

    setSelectedClient({
      ...newSelectedClient,
      dataNascimento: dataIso ?? undefined,
    });
    setIsModalOpen(true);
  };

  const handleConfirmEdit = () => {
    setIsModalOpen(false);
  };

  const handleChange = (name: string, value: string) => {
    setSelectedClient(() => ({ ...selectedClient, [name]: value }));
  };

  const handleSubmit = () => {
    const payload: any = {
      nome: selectedClient.nome,
      documento: removeMascaraDocumento(selectedClient.cpfCnpj),
      endereco: {
        bairro: selectedClient.bairro,
        cidade: selectedClient.cidade,
        estado: selectedClient.estado,
        cep: removeMascaraCep(selectedClient.cep),
      },
      telefone: removeMascaraTelefone(selectedClient.telefone),
      email: selectedClient.email,
    };

    if (!selectedClient.uuid) return;

    updateClient(payload, selectedClient.uuid).then(() => {
      fetchClients();
      setIsModalOpen(false);
      toast({ title: "Cliente atualizado com sucesso" });
    });
  };

  React.useEffect(() => {
    const clientData = data.filter((client) => {
      if (!filterValue) return true;
      return (
        client.email.toLowerCase().includes(filterValue.toLowerCase()) ||
        client.nome.toLowerCase().includes(filterValue.toLowerCase()) ||
        client.documento.toLowerCase().includes(filterValue.toLowerCase())
      );
    });
    setFilteredData(clientData);
  }, [filterValue, data]);

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por email, nome ou documento..."
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.length ? (
              filteredData.map((client) => (
                <TableRow key={client.uuid}>
                  <TableCell>{client.nome}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.documento}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      onClick={() => handleEditClick(client)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      className="hover:bg-red-500 hover:text-white"
                      onClick={() => console.log("Excluir", client.uuid)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Sem resultados ainda :(
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div>
          Página {currentPage} de {totalPages}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Próxima
          </Button>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Editar Cliente"
        description="Edite as informações do cliente selecionado."
        onConfirm={handleConfirmEdit}
      >
        {selectedClient && (
          <div>
            <CreateClientForm
              handleSubmit={handleSubmit}
              onCancel={() => setIsModalOpen(false)}
              handleChange={handleChange}
              setClienteData={setSelectedClient}
              clienteData={selectedClient}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
