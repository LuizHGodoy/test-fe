"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updatePlan } from "@/services/api/plans";
import Modal from "./client-modal";
import { Plan } from "./columns";
import { CreatePlanForm, IPlanFormularioData } from "./create-plans-form";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

interface PlansTableProps {
  data: Plan[];
  fetchPlans: () => void;
}

export function PlansTable({ data, fetchPlans }: PlansTableProps) {
  const [filteredData, setFilteredData] = React.useState<Plan[]>(data);
  const [filterValue, setFilterValue] = React.useState<string>("");

  const [selectedPlan, setSelectedPlan] = React.useState<IPlanFormularioData>(
    {} as IPlanFormularioData,
  );

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleEditClick = (plan: Plan) => {
    var newSelectedClient = {
      uuid: plan.uuid,
      nome: plan.nome,
      descricao: plan.descricao,
      precoBase: plan.precoBase,
    };

    setSelectedPlan(newSelectedClient);
    setIsModalOpen(true);
  };

  const handleConfirmEdit = () => {
    setIsModalOpen(false);
  };

  const handleChange = (name: string, value: string) => {
    setSelectedPlan(() => ({ ...selectedPlan, [name]: value }));
  };

  const handleSubmit = () => {
    const payload: any = {
      nome: selectedPlan.nome,
      descricao: selectedPlan.descricao,
      precoBase: selectedPlan.precoBase,
    };

    if (!selectedPlan.uuid) return;

    updatePlan(payload, selectedPlan.uuid).then(() => {
      fetchPlans();
      setIsModalOpen(false);
      toast({ title: "Plano atualizado com sucesso" });
    });
  };

  React.useEffect(() => {
    const filteredPlans = data.filter((plan) => {
      if (!filterValue) return true;
      const lowerCaseFilter = filterValue.toLowerCase();
      return (
        plan.nome.toLowerCase().includes(lowerCaseFilter) ||
        plan.descricao.toLowerCase().includes(lowerCaseFilter) ||
        plan.precoBase.toString().toLowerCase().includes(lowerCaseFilter)
      );
    });
    setFilteredData(filteredPlans);
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
            {filteredData.length ? (
              filteredData.map((plan) => (
                <TableRow key={plan.uuid}>
                  <TableCell>{plan.nome}</TableCell>
                  <TableCell>{plan.descricao}</TableCell>
                  <TableCell>{plan.precoBase}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      onClick={() => handleEditClick(plan)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      className="hover:bg-red-500 hover:text-white"
                      onClick={() => console.log("Excluir", plan.uuid)}
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

      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Editar Plano"
        description="Edite as informações do plano selecionado."
        onConfirm={handleConfirmEdit}
      >
        {selectedPlan && (
          <div>
            <CreatePlanForm
              handleSubmit={handleSubmit}
              onCancel={() => setIsModalOpen(false)}
              handleChange={handleChange}
              setPlanData={setSelectedPlan}
              planData={selectedPlan}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
