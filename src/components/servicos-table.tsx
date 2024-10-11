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
import { updateClient } from "@/services/api/clients";
import * as React from "react";
import Modal from "./client-modal";
import { Service } from "./columns";
import {
  CreateServiceForm,
  IServiceFormularioData,
} from "./create-service-form";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

interface ServiceTableProps {
  data: Service[];
  fetchServices: () => void;
}

export function ServicesTable({ data, fetchServices }: ServiceTableProps) {
  const [filteredData, setFilteredData] = React.useState<Service[]>(data);
  const [filterValue, setFilterValue] = React.useState<string>("");

  const [selectedService, setSelectedService] =
    React.useState<IServiceFormularioData>({} as IServiceFormularioData);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleEditClick = (service: Service) => {
    const newSelectedService = {
      uuid: service.uuid,
      nome: service.nome,
      descricao: service.descricao,
      preco: service.preco,
    };

    setSelectedService(newSelectedService);
    setIsModalOpen(true);
  };

  const handleChange = (name: string, value: string) => {
    setSelectedService((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmEdit = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    const payload: any = {
      nome: selectedService.nome,
      descricao: selectedService.descricao,
      preco: selectedService.preco,
    };

    if (!selectedService.uuid) return;

    updateClient(payload, selectedService.uuid).then(() => {
      fetchServices();
      setIsModalOpen(false);
      toast({ title: "Serviço atualizado com sucesso" });
    });
  };

  React.useEffect(() => {
    const filteredServices = data.filter((service) => {
      if (!filterValue) return true;
      const lowerCaseFilter = filterValue.toLowerCase();
      return (
        service.nome.toLowerCase().includes(lowerCaseFilter) ||
        service.descricao.toLowerCase().includes(lowerCaseFilter) ||
        service.preco.toString().toLowerCase().includes(lowerCaseFilter)
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
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((service) => (
                <TableRow key={service.uuid}>
                  <TableCell>{service.nome}</TableCell>
                  <TableCell>{service.descricao}</TableCell>
                  <TableCell>{service.preco}</TableCell>
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
        {selectedService && (
          <div>
            <CreateServiceForm
              handleSubmit={handleSubmit}
              onCancel={() => setIsModalOpen(false)}
              handleChange={handleChange}
              setServiceData={setSelectedService}
              serviceData={selectedService}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
