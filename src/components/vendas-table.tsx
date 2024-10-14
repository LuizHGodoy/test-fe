"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateService } from "@/services/api/aditional-services";
import * as React from "react";
import Modal from "./client-modal";
import { Venda } from "./columns";
import { CreateVendasForm, IVendasFormularioData } from "./create-vendas-form";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

interface VendasTableProps {
  data: Venda[];
  fetchVendas: () => void;
}

export function VendasTable({ data, fetchVendas }: VendasTableProps) {
  const [filteredData, setFilteredData] = React.useState<Venda[]>(data);
  const [filterValue, setFilterValue] = React.useState<string>("");

  const [selectedVenda, setSelectedVenda] =
    React.useState<IVendasFormularioData>({} as IVendasFormularioData);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleEditClick = (venda: Venda) => {
    const newSelectedVenda = {
      uuid: venda.uuid,
      clientes: venda.clientes,
      planos: venda.planos,
      servicos: venda.servicos,
      totalVenda: venda.totalVenda,
      descontoAplicado: venda.descontoAplicado,
      status: venda.status,
      vendedorUuid: venda.vendedorUuid,
    };

    setSelectedVenda(newSelectedVenda);
    setIsModalOpen(true);
  };

  const handleChange = (name: string, value: string | number) => {
    setSelectedVenda((prev) => ({
      ...prev,
      [name]: name === "totalVenda" ? Number(value) : value,
    }));
  };

  const handleConfirmEdit = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    const payload: any = {
      uuid: selectedVenda.uuid,
      clientes: selectedVenda.clientes,
      planos: selectedVenda.planos,
      servicos: selectedVenda.servicos,
      totalVenda: selectedVenda.totalVenda,
      descontoAplicado: selectedVenda.descontoAplicado,
      status: selectedVenda.status,
      vendedorUuid: selectedVenda.vendedorUuid,
    };

    if (!selectedVenda.uuid) return;

    updateService(payload, selectedVenda.uuid).then(() => {
      fetchVendas();
      setIsModalOpen(false);
      toast({ title: "Venda atualizada com sucesso" });
    });
  };

  React.useEffect(() => {
    const filteredServices = data.filter((service) => {
      if (!filterValue) return true;

      const lowerCaseFilter = filterValue.toLowerCase();
      return (
        service.clientes[0].nome.toLowerCase().includes(lowerCaseFilter) ||
        service.planos[0].nome.toLowerCase().includes(lowerCaseFilter) ||
        service.servicos[0].nome.toLowerCase().includes(lowerCaseFilter) ||
        service.status.toLowerCase().includes(lowerCaseFilter)
      );
    });
    setFilteredData(filteredServices);
  }, [filterValue, data]);

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por nome, descrição ou preço..."
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Serviços</TableHead>
              <TableHead>Valor Total</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((service) => (
                <TableRow key={service.uuid}>
                  <TableCell>
                    {service.clientes && service.clientes[0].nome}
                    {"cliente exemplo"}
                  </TableCell>
                  <TableCell>
                    {service.clientes && service.planos[0].nome}
                    {"plano exemplo"}
                  </TableCell>
                  <TableCell>
                    {service.clientes && service.servicos[0].nome}
                    {"serviço exemplo"}
                  </TableCell>
                  <TableCell>
                    {service.totalVenda && "R$"}
                    {"R$ 1459,99"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      onClick={() => handleEditClick(service)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      className="hover:bg-red-500 hover:text-white"
                      onClick={() => console.log("Excluir", service.uuid)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Editar Serviço"
        description="Edite as informações do serviço selecionado."
        onConfirm={handleConfirmEdit}
      >
        {selectedVenda && (
          <div>
            <CreateVendasForm
              handleSubmit={handleSubmit}
              onCancel={() => setIsModalOpen(false)}
              handleChange={handleChange}
              setVendasData={setSelectedVenda}
              vendasData={selectedVenda}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
